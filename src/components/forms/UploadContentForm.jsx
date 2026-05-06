// src/components/forms/UploadContentForm.jsx

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { uploadSchema } from "@/features/teacher/utils/uploadSchema";

import { uploadContent } from "@/features/teacher/services/teacher.service";

const UploadContentForm = () => {
  /*
    Image preview state
  */

  const [preview, setPreview] = useState(null);

  /*
    Form setup
  */

  const form = useForm({
    resolver: zodResolver(uploadSchema),

    defaultValues: {
      title: "",
      subject: "",
      description: "",
      startTime: "",
      endTime: "",
      rotationDuration: "",
    },
  });

  /*
    Upload mutation
  */

  const mutation = useMutation({
    mutationFn: uploadContent,

    onSuccess: () => {
      toast.success("Content uploaded successfully");

      form.reset();

      setPreview(null);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  /*
    File validation + preview
  */

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    /*
      Validate file type
    */

    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and GIF allowed");

      return;
    }

    /*
      Validate file size
    */

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be below 10MB");

      return;
    }

    /*
      Store file in form
    */

    form.setValue("file", file);

    /*
      Generate preview
    */

    setPreview(URL.createObjectURL(file));
  };

  /*
    Submit handler
  */

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,

      preview,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Content</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter subject" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Upload File</label>

              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
              />
            </div>

            {/* Preview */}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-48 w-full rounded-lg object-cover"
              />
            )}

            {/* Start Time */}

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>

                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Time */}

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>

                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rotation Duration */}

            <FormField
              control={form.control}
              name="rotationDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rotation Duration</FormLabel>

                  <FormControl>
                    <Input placeholder="Example: 10 sec" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Uploading..." : "Upload Content"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadContentForm;