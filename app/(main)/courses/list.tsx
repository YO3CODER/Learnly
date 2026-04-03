"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";

type Props = {
  courses: typeof courses.$inferSelect[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id)  
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-8">
      <div className="
        grid 
        gap-4 
        auto-rows-auto
        
        /* Mobile (1 colonne) */
        grid-cols-1
        
        /* Tablet (2 colonnes) */
        sm:grid-cols-2
        
        /* Desktop (3 colonnes) */
        lg:grid-cols-3
        
        /* Large Desktop (4 colonnes) */
        xl:grid-cols-4
        
        /* Très grand écran (auto) */
        2xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
      ">
        {courses.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onClick={onClick}
            disabled={pending}
            active={course.id === activeCourseId}
          />
        ))}
      </div>
    </div>
  );
};