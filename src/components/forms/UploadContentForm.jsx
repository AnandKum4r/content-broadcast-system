// src/components/forms/UploadContentForm.jsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Clock, Info, X } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
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
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and GIF allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be below 10MB");
      return;
    }

    form.setValue("file", file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
      preview,
      teacherId: user?.id,
      teacherName: user?.name,
      status: "pending",
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-0 sm:px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Container: Stacks on mobile, Side-by-side on LG */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column: Media & Info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-indigo-600 font-bold">
                  <Info size={18} />
                  <h3 className="text-base md:text-lg">Content Details</h3>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Q2 Mathematics Seminar"
                            className="h-11 md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Advanced Calculus"
                            className="h-11 md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-30 md:min-h-37.5 resize-none"
                            placeholder="Briefly describe the content purpose..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Scheduling & Media */}
            <div className="space-y-6">
              {/* File Upload Section */}
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 md:p-8 transition-all hover:bg-slate-50">
                <div className="flex flex-col items-center text-center">
                  {preview ? (
                    <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-48 md:h-56 lg:h-40 w-full rounded-xl object-cover border shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setPreview(null);
                            form.setValue("file", null);
                          }}
                        >
                          Change Image
                        </Button>
                      </div>
                      {/* Mobile-friendly clear button */}
                      <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg lg:hidden"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full py-4">
                      <div className="mb-3 rounded-full bg-indigo-100 p-4 text-indigo-600 mx-auto w-fit">
                        <ImagePlus size={28} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 block">
                        Tap to upload media
                      </span>
                      <span className="text-xs text-slate-500">
                        JPG, PNG or GIF (Max 10MB)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Scheduling Section */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-indigo-600 font-bold">
                  <Clock size={18} />
                  <h3 className="text-base md:text-lg">Scheduling</h3>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              className="h-11 md:h-12 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              className="h-11 md:h-12 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="rotationDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rotation Delay (Seconds)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            className="h-11 md:h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Full width on mobile, Auto width on tablet+ */}
          <div className="flex flex-col sm:flex-row justify-end pt-4 gap-3">
            <Button
              type="submit"
              className="w-full cursor-pointer sm:w-auto px-12 h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg transition-transform active:scale-95"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Processing..." : "Publish Content"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadContentForm;
