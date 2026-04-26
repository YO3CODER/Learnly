import { lessons, units } from "@/db/schema"
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  index: number;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

const getUnitColor = (id: number, order: number) => {
  const colors = [
    "blue", "purple", "green", "orange",
    "pink", "indigo", "teal", "red",
  ];
  return colors[(order - 1) % colors.length];
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  index,
}: Props) => {
  return (
    <div id={`unit-${index}`}>
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </div>
  );
};