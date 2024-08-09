"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
        .max(30, { message: "The number of days cannot exceed 30" })
    ),
  budgetType: z.enum(["cheap", "moderate", "luxury"], {
    required_error: "Please select one budget type.",
  }),

  travelWith: z.enum(["alone", "couple", "family", "friends"], {
    required_error: "Please select travel type.",
  }),
});

const CreateTripForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      tripDays: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { destination, budgetType, travelWith, tripDays } = values;
    const prompt = `Generate Travel Plan for Location: ${destination}, for ${tripDays} Days for ${travelWith} with a ${budgetType} budget. Give me a hotels options list with name, address, price, imageUrl, geoCoordinates, rating, descriptions and suggest itinerary with name, details, imageUrl, geoCoordinates, ticketPricing, travelTime each of the location for ${tripDays} days with each day plan with best time to visit in JSON format`;
    const response = await chatSession.sendMessage(prompt);

    const result = response.response.text();

    console.log(result);
    form.reset();
    toast.success("Successfully toasted!");
  };

  return (
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
                    <RxActivityLog /> Who do you plan on traveling with on your
                    next adventure?
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
            <Button type="submit" className="w-full" size={"lg"}>
              Generate Trip <FaPaperPlane className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTripForm;
