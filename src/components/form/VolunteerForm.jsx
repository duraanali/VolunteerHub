import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquare, AlertCircle } from "lucide-react";
import { volunteerSchema } from "../../schemas/volunteer";

const VolunteerForm = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      await axios.post("http://localhost:3002/api/volunteers", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitSuccess(true);
      reset();
      onSubmitSuccess();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        "There was an error submitting your form. Please try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Volunteer Registration
      </h2>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6 flex items-start">
          <CheckSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Registration successful!</p>
            <p className="text-sm">
              Thank you for volunteering. We'll be in touch soon.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Submission failed</p>
            <p className="text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              className={`input-field ${errors.name ? "border-red-500" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className={`input-field ${errors.email ? "border-red-500" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              className={`input-field ${errors.phone ? "border-red-500" : ""}`}
              placeholder="(123) 456-7890"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn ${
              isValid && isDirty ? "btn-primary" : "btn-disabled"
            }`}
            disabled={isSubmitting || !isValid || !isDirty}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;
