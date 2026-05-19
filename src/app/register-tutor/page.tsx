"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CheckCircle2, 
  Send, 
  User, 
  Phone, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { KANPUR_AREAS } from "@/data/areas";
import LoadingAnimation from "@/components/LoadingAnimation";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Please select your gender"
  }),
  residenceArea: z.string().min(1, "Please select your area"),
  experience: z.string().min(1, "Please select experience"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  classes: z.array(z.string()),
  boards: z.array(z.string()),
  teachingMode: z.enum(["Home Visit", "Online", "Both"], {
    message: "Please select teaching mode"
  }),
  qualification: z.string().min(2, "Please state your qualification"),
  introduction: z.string().min(50, "Intro must be at least 50 characters"),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterTutor() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [],
      classes: [],
      boards: [],
      consent: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.error || "Something went wrong. Please try again or contact us on WhatsApp.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleStep1Next = async () => {
    const isValid = await trigger(["fullName", "whatsapp", "gender", "residenceArea"]);
    if (isValid) nextStep();
  };

  const handleStep2Next = async () => {
    const isValid = await trigger(["experience", "subjects"]);
    if (isValid) nextStep();
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full custom-form p-12 text-center">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Registration Received!</h1>
          <p className="text-muted mb-8">
            Thank you for registering. Our team will contact you on WhatsApp within 24-48 hours.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:scale-105 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Tutor Network</h1>
          <p className="text-muted">Register as a home tutor and start getting teaching opportunities in Kanpur.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -z-10" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-[#1A1A1A] text-muted border border-white/5"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <User className="text-primary" /> Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted ml-4">Full Name</label>
                  <div className="custom-field">
                    <User className="w-5 h-5 text-muted" />
                    <input 
                      {...register("fullName")}
                      className="custom-input"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-xs ml-4">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted ml-4">WhatsApp Number</label>
                  <div className="custom-field">
                    <Phone className="w-5 h-5 text-muted" />
                    <input 
                      {...register("whatsapp")}
                      className="custom-input"
                      placeholder="10-digit number"
                    />
                  </div>
                  {errors.whatsapp && <p className="text-red-400 text-xs ml-4">{errors.whatsapp.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted ml-4">Gender</label>
                  <div className="custom-field">
                    <select 
                      {...register("gender")}
                      className="custom-input appearance-none bg-transparent"
                    >
                      <option value="" className="bg-card">Select Gender</option>
                      <option value="Male" className="bg-card">Male</option>
                      <option value="Female" className="bg-card">Female</option>
                      <option value="Other" className="bg-card">Other</option>
                    </select>
                  </div>
                  {errors.gender && <p className="text-red-400 text-xs ml-4">{errors.gender.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted ml-4">Residence Area</label>
                  <div className="custom-field">
                    <MapPin className="w-5 h-5 text-muted" />
                    <select 
                      {...register("residenceArea")}
                      className="custom-input appearance-none bg-transparent"
                    >
                      <option value="" className="bg-card">Select Area</option>
                      {KANPUR_AREAS.map(area => (
                        <option key={area.slug} value={area.slug} className="bg-card">{area.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.residenceArea && <p className="text-red-400 text-xs ml-4">{errors.residenceArea.message}</p>}
                </div>
              </div>

              <button 
                type="button" 
                onClick={handleStep1Next}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 mt-8 hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Teaching Experience */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <BookOpen className="text-primary" /> Teaching Details
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted ml-4">Teaching Experience</label>
                <div className="custom-field">
                  <select 
                    {...register("experience")}
                    className="custom-input appearance-none bg-transparent"
                  >
                    <option value="" className="bg-card">Select Years</option>
                    <option value="0-1" className="bg-card">0-1 Years</option>
                    <option value="1-3" className="bg-card">1-3 Years</option>
                    <option value="3-5" className="bg-card">3-5 Years</option>
                    <option value="5-10" className="bg-card">5-10 Years</option>
                    <option value="10+" className="bg-card">10+ Years</option>
                  </select>
                </div>
                {errors.experience && <p className="text-red-400 text-xs ml-4">{errors.experience.message}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-muted ml-4">Subjects You Teach</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Maths", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Accountancy", "Computer"].map(sub => (
                    <label key={sub} className="flex items-center space-x-2 bg-white/5 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                      <input 
                        type="checkbox" 
                        value={sub} 
                        {...register("subjects")}
                        className="w-4 h-4 rounded border-white/10 text-primary focus:ring-primary bg-transparent"
                      />
                      <span className="text-xs text-white">{sub}</span>
                    </label>
                  ))}
                </div>
                {errors.subjects && <p className="text-red-400 text-xs ml-4">{errors.subjects.message}</p>}
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex-1 bg-[#252525] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-black transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button 
                  type="button" 
                  onClick={handleStep2Next}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Briefcase className="text-primary" /> Professional Info
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted ml-4">Highest Qualification</label>
                <div className="custom-field">
                  <GraduationCap className="w-5 h-5 text-muted" />
                  <input 
                    {...register("qualification")}
                    className="custom-input"
                    placeholder="e.g. B.Tech (IIT Kanpur), M.Sc Physics"
                  />
                </div>
                {errors.qualification && <p className="text-red-400 text-xs ml-4">{errors.qualification.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted ml-4">Short Introduction</label>
                <textarea 
                  {...register("introduction")}
                  rows={4}
                  className="w-full bg-[#171717] border border-transparent focus:border-primary rounded-[25px] p-4 text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] outline-none transition-all text-sm"
                  placeholder="Tell us about your teaching style..."
                />
                {errors.introduction && <p className="text-red-400 text-xs ml-4">{errors.introduction.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted ml-4">Teaching Mode</label>
                <div className="flex gap-4">
                  {["Home Visit", "Online", "Both"].map(mode => (
                    <label key={mode} className="flex-1 flex items-center justify-center space-x-2 bg-white/5 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                      <input 
                        type="radio" 
                        value={mode} 
                        {...register("teachingMode")}
                        className="text-primary focus:ring-primary bg-transparent"
                      />
                      <span className="text-xs text-white">{mode}</span>
                    </label>
                  ))}
                </div>
                {errors.teachingMode && <p className="text-red-400 text-xs ml-4">{errors.teachingMode.message}</p>}
              </div>

              <div className="pt-4">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    {...register("consent")}
                    className="mt-1 w-5 h-5 rounded border-white/10 text-primary focus:ring-primary bg-transparent"
                  />
                  <span className="text-xs text-muted group-hover:text-white transition-colors">
                    I agree to the terms and privacy policy.
                  </span>
                </label>
                {errors.consent && <p className="text-red-400 text-xs mt-2 ml-4">{errors.consent.message}</p>}
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex-1 bg-[#252525] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-black transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <LoadingAnimation />
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
