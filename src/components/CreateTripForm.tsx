"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaPaperPlane } from "react-icons/fa6";
import { travelBudgets, travelOptions } from "@/constant/travel-options";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { RxActivityLog } from "react-icons/rx";
import toast from "react-hot-toast";
import { chatSession } from "@/service/gemini-api-ai";

import { TbFidgetSpinner } from "react-icons/tb";
import TripLoader from "./TripLoader";
import { FaGoogle } from "react-icons/fa";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase-config";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  tripDays: z
    .string()
    .refine(val => !isNaN(Number(val)), {
      message: "Please provide a valid number",
    })
    .transform(val => Number(val))
    .pipe(
      z
        .number()
        .min(1, { message: "The number of days must be at least 1" })
        .max(7, { message: "The number of days cannot exceed 7" })
    ),
  budgetType: z.enum(["cheap", "moderate", "luxury"], {
    required_error: "Please select one budget type.",
  }),

  travelWith: z.enum(["alone", "couple", "family", "friends"], {
    required_error: "Please select travel type.",
  }),
});

const CreateTripForm = () => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      tripDays: 0,
    },
  });
  const saveDatatoDB = async (values: any, result: any) => {
    const user = localStorage.getItem("Guser");
    if (user) {
      const docId = Date.now().toString();
      const userInfo = JSON.parse(user);
      try {
        await setDoc(doc(db, "tripsAi", docId), {
          userSelection: values,
          tripData: JSON.parse(result),
          userEmail: userInfo?.email,
          id: docId,
        });
        router.push(`view-trips/${docId}`);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = localStorage.getItem("Guser");
      if (!user) {
        setOpenDialog(true);
        return;
      }
      setGenerating(true);
      const { destination, budgetType, travelWith, tripDays } = values;

      const prompt = `Generate a Travel Plan for Location: ${destination}, for ${tripDays} Days, for ${travelWith}, with a ${budgetType} budget. Provide a list of hotel options with the following fields: name, address, price, imageUrl, geoCoordinates, rating, and descriptions. Additionally, suggest an itinerary for each of the ${tripDays} days as an array with the following fields: name, details, imageUrl, geoCoordinates, ticketPricing, travelTime, and best time to visit. If any field is unavailable, use "N/A" as the value. Ensure the result is in JSON format and maintain the same JSON format even if the places or days change.`;
      const response = await chatSession.sendMessage(prompt);

      const result = response.response.text();

      if (result) {
        toast.success("Trip plan successfully created!");
        saveDatatoDB(values, result);
        form.reset();
      }
    } catch (error) {
      toast.error("Sorry something went!");
    } finally {
      setGenerating(false);
    }
  };

  const getUserInfo = (tokenInfo: any) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer: ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then(response => {
        const userInfo = {
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture,
          userId: response.data.sub,
          accessToken: tokenInfo.access_token,
        };

        localStorage.setItem("Guser", JSON.stringify(userInfo));
        toast.success("Login successfully!");

        setOpenDialog(false);
      });
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      // console.log(tokenResponse);
      getUserInfo(tokenResponse);
    },
    onError: err => console.log(err),
  });

  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader className="space-y-8">
            <DialogTitle className="flex items-center justify-center gap-2 capitalize">
              <Image
                src={"/logo.svg"}
                width={50}
                height={50}
                alt="logo"
              ></Image>
              Sign in to the App with Google auth securely
            </DialogTitle>

            <DialogDescription>
              <Button className="w-full" onClick={() => login()}>
                <FaGoogle className="mr-2 w-5 h-5" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="capitalize text-xl">
            Tell your preferences and get started!
          </CardTitle>
          <CardDescription>
            Enjoy your adventure with AI-crafted itineraries in one click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-5xl mx-auto mt-5"
            >
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-lg flex items-center gap-2">
                      <RxActivityLog /> What is destination of choice?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tripDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-lg flex items-center gap-2">
                      <RxActivityLog /> How many dayays are you planning your
                      trip?
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Note:Trip restrict b/w 1 to 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-lg flex items-center gap-2">
                      <RxActivityLog /> What is Your Budget?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                          {travelBudgets.map(option => (
                            <Card
                              key={option.id}
                              className={cn(
                                "w-full px-2 transition-colors duration-500",
                                field.value === option.type &&
                                  "border-r-8 border-l-8 border-indigo-500"
                              )}
                            >
                              <CardHeader>
                                <CardTitle className="text-2xl">
                                  {option.icon}
                                </CardTitle>
                                <CardDescription>
                                  {option.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option.type} />
                                  </FormControl>
                                  <FormLabel className="font-normal text-center cursor-pointer">
                                    <p className="text-base capitalize">
                                      {option.type}
                                    </p>
                                  </FormLabel>
                                </FormItem>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelWith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-lg flex items-center gap-2">
                      <RxActivityLog /> Who do you plan on traveling with on
                      your next adventure?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {travelOptions.map(option => (
                            <Card
                              key={option.id}
                              className={cn(
                                "w-full px-2  transition-colors duration-500",
                                field.value === option.type &&
                                  "border-r-8 border-l-8 border-indigo-500"
                              )}
                              // onClick={() => field.onChange(option.type)}
                            >
                              <CardHeader>
                                <CardTitle className="text-2xl">
                                  {option.icon}
                                </CardTitle>
                                <CardDescription>
                                  {option.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option.type} />
                                  </FormControl>
                                  <FormLabel className="font-normal text-center cursor-pointer">
                                    <p className="text-base capitalize">
                                      {option.title}
                                    </p>
                                  </FormLabel>
                                </FormItem>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator></Separator>
              {generating ? (
                <Button
                  type="submit"
                  className="w-full"
                  size={"lg"}
                  disabled={generating}
                >
                  Generating Travel Plan{" "}
                  <TbFidgetSpinner className="ml-2 w-4 h-4 animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  size={"lg"}
                  disabled={generating}
                >
                  Generate Trip <FaPaperPlane className="ml-2 w-4 h-4" />
                </Button>
              )}

              {generating && <TripLoader loading={generating}></TripLoader>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateTripForm;
