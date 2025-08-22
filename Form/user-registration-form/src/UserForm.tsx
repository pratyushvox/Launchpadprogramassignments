import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';

// Define the schema with Zod
const userSchema = z.object({
  firstName: z.string()
    .min(1, { message: "First name is required" })
    .regex(/^(?!\s*$).+/, { message: "First name cannot be only whitespace" }),
  lastName: z.string()
    .min(1, { message: "Last name is required" })
    .regex(/^(?!\s*$).+/, { message: "Last name cannot be only whitespace" }),
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  contactNumber: z.string()
    .min(1, { message: "Contact number is required" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid contact number format" }),
  role: z.string()
    .min(1, { message: "Role is required" }),
  skills: z.array(z.object({
    value: z.string()
      .min(1, { message: "Skill is required" })
      .regex(/^(?!\s*$).+/, { message: "Skill cannot be only whitespace" })
  })).min(1, { message: "At least one skill is required" }),
  message: z.string().optional()
});


type UserFormData = z.infer<typeof userSchema>;

const UserRegistrationForm = () => {
  const [submittedData, setSubmittedData] = React.useState<UserFormData | null>(null);
  
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      skills: [{ value: '' }],
      role: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = (data: UserFormData) => {
    setSubmittedData(data);
    toast.success('Registration successful!');
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Registration</h1>
          <p className="text-gray-600">Please fill out the form below to register</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-lg p-6 lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input 
                  id="firstName"
                  {...register('firstName')} 
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input 
                  id="lastName"
                  {...register('lastName')} 
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input 
                id="email"
                type="email" 
                {...register('email')} 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number*
              </label>
              <input 
                id="contactNumber"
                {...register('contactNumber')} 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role*
              </label>
              <select 
                id="role"
                {...register('role')} 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="admin">Administrator</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills*
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-2 flex items-start">
                  <div className="flex-grow">
                    <input
                      {...register(`skills.${index}.value` as const)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.skills?.[index]?.value ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter a skill"
                    />
                    {errors.skills?.[index]?.value && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.value?.message}</p>
                    )}
                  </div>
                  {index > 0 && (
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {errors.skills && !errors.skills[0] && (
                <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
              )}
              <button 
                type="button" 
                onClick={() => append({ value: '' })}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Add Skill
              </button>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea 
                id="message"
                {...register('message')} 
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional message"
              />
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-[#8fd0ed] text-white font-medium rounded-md hover:bg-[#65b9e1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
            >
              Register
            </button>
          </form>

          <div className="bg-white shadow-xl rounded-lg p-6 lg:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Submitted Data</h2>
            
            {submittedData ? (
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-green-800">Registration Successful!</h3>
                </div>
                <pre className="text-sm text-green-800 overflow-auto bg-green-100 p-4 rounded-md">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Your data will appear here</h3>
                <p className="text-gray-500">After submitting the form, your registration data will be displayed in this section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;