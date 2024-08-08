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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaPaperPlane } from "react-icons/fa6";
import { travelBudgets, travelOptions } from "@/constant/travelOptions";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";
import { BsFillInfoSquareFill } from "react-icons/bs";

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  tripDays: z.number().min(2, {
    message: "Please provide number",
  }),
  budgetType: z.enum(["cheap", "moderate", "luxury"], {
    required_error: "Please select one budget type.",
  }),

  travelWith: z.enum(["alone", "couple", "family", "friends"], {
    required_error: "Please select one budget type.",
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
                  <FormLabel>What is destination of choice?</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>
                    How many dayays are you planning your trip?
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is Your Budget?</FormLabel>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    {travelBudgets.map(option => (
                      <Card
                        key={option.id}
                        className={cn(
                          "w-full px-2",
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
                          <FormControl key={option.id}>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option.type} />
                                </FormControl>
                                <FormLabel className="font-normal text-center">
                                  <p className="text-base capitalize">
                                    {option.type}
                                  </p>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="travelWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Who do you plan on traveling with on your next adventure?
                  </FormLabel>
                  <div className="grid grid-cols-3 gap-5">
                    {travelOptions.map(option => (
                      <Card
                        key={option.id}
                        className={cn(
                          "w-full px-2",
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
                          <FormControl key={option.id}>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option.type} />
                                </FormControl>
                                <FormLabel className="font-normal text-center">
                                  <p className="text-base capitalize">
                                    {option.title}
                                  </p>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
