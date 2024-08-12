import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <main className="min-h-screen px-5 py-10 space-y-10">
      <div className="flex items-center justify-center gap-5">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </CardContent>
        </Card>
        <div className="hidden md:block w-full border"></div>
      </div>
      <Separator></Separator>
      <div className="w-full flex items-center justify-center gap-5 my-10 px-5 py-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
      <Separator></Separator>
      <div className="w-full flex items-center justify-center gap-5 my-10 px-5 py-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-full" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-10 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Loading;
