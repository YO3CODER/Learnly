import { lessons, units } from "@/db/schema"

import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

// Fonction pour assigner une couleur basée sur l'ID ou l'ordre
const getUnitColor = (id: number, order: number) => {
  // Utilisez l'ID ou l'order pour déterminer la couleur
  const colors = [
    "blue",    // Unité 1
    "purple",  // Unité 2
    "green",   // Unité 3
    "orange",  // Unité 4
    "pink",    // Unité 5
    "indigo",  // Unité 6
    "teal",    // Unité 7
    "red",     // Unité 8
  ];
  
  // Utilisez order-1 car order commence généralement à 1
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
}: Props) => {
  // Déterminez la couleur pour cette unité
  const unitColor = getUnitColor(id, order);
  
  return (
    <>
      <UnitBanner 
        title={title} 
        description={description}
        color={unitColor}
        accentColor={unitColor}
      />
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
    </>
  );
};