import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckSquare, AlertCircle } from 'lucide-react';
import { volunteerSchema } from '../../schemas/volunteer';

const VolunteerForm = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      availability: [],
      skills: [],
      experience: '',
    }
  });
  
  const availabilityOptions = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings'
  ];
  
  const skillOptions = [
    'Teaching',
    'Event planning',
    'Administrative',
    'Technology',
    'Marketing',
    'Fundraising',
    'Construction',
    'Healthcare',
    'Cooking',
    'Transportation'
  ];
  
  const referralOptions = [
    'Friend',
    'Social media',
    'Website',
    'Event',
    'Newsletter',
    'Other'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    
    try {
      await axios.post('http://localhost:3002/api/volunteers', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      setSubmitSuccess(true);
      reset();
      onSubmitSuccess();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      setSubmitError('There was an error submitting your form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer Registration</h2>
      
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6 flex items-start">
          <CheckSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Registration successful!</p>
            <p className="text-sm">Thank you for volunteering. We'll be in touch soon.</p>
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
          <div>
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input
              id="firstName"
              type="text"
              className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
              {...register('firstName')}
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input
              id="lastName"
              type="text"
              className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
              {...register('lastName')}
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              id="email"
              type="email"
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              {...register('email')}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="form-label">Phone *</label>
            <input
              id="phone"
              type="tel"
              className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="(123) 456-7890"
              {...register('phone')}
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </div>
          
          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="form-label">Address *</label>
            <input
              id="address"
              type="text"
              className={`input-field ${errors.address ? 'border-red-500' : ''}`}
              {...register('address')}
            />
            {errors.address && <p className="error-message">{errors.address.message}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="form-label">City *</label>
            <input
              id="city"
              type="text"
              className={`input-field ${errors.city ? 'border-red-500' : ''}`}
              {...register('city')}
            />
            {errors.city && <p className="error-message">{errors.city.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="form-label">State *</label>
              <input
                id="state"
                type="text"
                className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                {...register('state')}
              />
              {errors.state && <p className="error-message">{errors.state.message}</p>}
            </div>
            
            <div>
              <label htmlFor="zip" className="form-label">ZIP *</label>
              <input
                id="zip"
                type="text"
                className={`input-field ${errors.zip ? 'border-red-500' : ''}`}
                {...register('zip')}
              />
              {errors.zip && <p className="error-message">{errors.zip.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Availability */}
        <div>
          <label className="form-label">Availability *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availabilityOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`availability-${option}`}
                  type="checkbox"
                  value={option}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('availability')}
                />
                <label htmlFor={`availability-${option}`} className="ml-2 text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.availability && <p className="error-message mt-1">{errors.availability.message}</p>}
        </div>
        
        {/* Skills */}
        <div>
          <label className="form-label">Skills & Interests *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  id={`skill-${skill}`}
                  type="checkbox"
                  value={skill}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('skills')}
                />
                <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">
                  {skill}
                </label>
              </div>
            ))}
          </div>
          {errors.skills && <p className="error-message mt-1">{errors.skills.message}</p>}
        </div>
        
        {/* Experience */}
        <div>
          <label htmlFor="experience" className="form-label">Previous Volunteer Experience</label>
          <textarea
            id="experience"
            rows={3}
            className="input-field"
            placeholder="Please describe any previous volunteer experience..."
            {...register('experience')}
          />
        </div>
        
        {/* Interests */}
        <div>
          <label htmlFor="interests" className="form-label">Specific Areas of Interest *</label>
          <textarea
            id="interests"
            rows={3}
            className={`input-field ${errors.interests ? 'border-red-500' : ''}`}
            placeholder="What projects or causes are you most interested in supporting?"
            {...register('interests')}
          />
          {errors.interests && <p className="error-message">{errors.interests.message}</p>}
        </div>
        
        {/* Referral */}
        <div>
          <label className="form-label">How did you hear about us? *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {referralOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`referral-${option}`}
                  type="radio"
                  value={option}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  {...register('referral')}
                />
                <label htmlFor={`referral-${option}`} className="ml-2 text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.referral && <p className="error-message mt-1">{errors.referral.message}</p>}
        </div>
        
        {/* Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="emergencyContact" className="form-label">Emergency Contact Name *</label>
            <input
              id="emergencyContact"
              type="text"
              className={`input-field ${errors.emergencyContact ? 'border-red-500' : ''}`}
              {...register('emergencyContact')}
            />
            {errors.emergencyContact && <p className="error-message">{errors.emergencyContact.message}</p>}
          </div>
          
          <div>
            <label htmlFor="emergencyPhone" className="form-label">Emergency Contact Phone *</label>
            <input
              id="emergencyPhone"
              type="tel"
              className={`input-field ${errors.emergencyPhone ? 'border-red-500' : ''}`}
              placeholder="(123) 456-7890"
              {...register('emergencyPhone')}
            />
            {errors.emergencyPhone && <p className="error-message">{errors.emergencyPhone.message}</p>}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className={`btn ${isValid && isDirty ? 'btn-primary' : 'btn-disabled'}`}
            disabled={isSubmitting || !isValid || !isDirty}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;