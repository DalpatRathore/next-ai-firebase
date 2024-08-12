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

const Loading = () => {
  return (
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
  );
};

export default Loading;
