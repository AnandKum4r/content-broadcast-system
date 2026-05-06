// src/features/teacher/utils/uploadSchema.js

import { z } from "zod";

/*
  Upload content validation
*/

export const uploadSchema = z
  .object({
    title: z.string().min(1, "Title is required"),

    subject: z.string().min(1, "Subject is required"),

    description: z.string().optional(),

    file: z.any(),

    startTime: z.string().min(1, "Start time required"),

    endTime: z.string().min(1, "End time required"),

    rotationDuration: z.string().optional(),
  })

  /*
    End time validation
  */

  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),

    {
      message: "End time must be after start time",

      path: ["endTime"],
    },
  );