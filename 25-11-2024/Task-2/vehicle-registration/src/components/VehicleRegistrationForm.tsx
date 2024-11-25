import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VehicleRegistrationForm.css';

interface FormData {
  ownerName: string;
  contactNumber: string;
  vehicleModel: string;
  registrationNumber: string;
  vehicleColor: string;
}

const VehicleRegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Vehicle Registration Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-group">
            <label className="form-label">Owner Name</label>
            <input
              {...register('ownerName', { required: 'Owner Name is required' })}
              type="text"
              className="form-input"
              placeholder="Owner Name"
            />
            {errors.ownerName && <p className="form-error">{errors.ownerName.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input
              {...register('contactNumber', {
                required: 'Contact Number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit number',
                },
              })}
              type="text"
              className="form-input"
              placeholder="Contact Number"
            />
            {errors.contactNumber && <p className="form-error">{errors.contactNumber.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Vehicle Model</label>
            <input
              {...register('vehicleModel', { required: 'Vehicle Model is required' })}
              type="text"
              className="form-input"
              placeholder="Vehicle Model"
            />
            {errors.vehicleModel && <p className="form-error">{errors.vehicleModel.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Registration Number</label>
            <input
              {...register('registrationNumber', {
                required: 'Registration Number is required',
                pattern: {
                  value: /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/,
                  message: 'Registration Number must match format TS09EA1234',
                },
              })}
              type="text"
              className="form-input"
              placeholder="Registration Number"
            />
            {errors.registrationNumber && <p className="form-error">{errors.registrationNumber.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Vehicle Color</label>
            <input
              {...register('vehicleColor', { required: 'Vehicle Color is required' })}
              type="text"
              className="form-input"
              placeholder="Vehicle Color"
            />
            {errors.vehicleColor && <p className="form-error">{errors.vehicleColor.message}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="form-button">
              Submit
            </button>
          </div>
        </form>
      </div>

      {isPopupVisible && (
        <>
          <div className="overlay show" onClick={closePopup}></div>
          <div className="success-popup show">
            <h2>Vehicle Registered Successfully!</h2>
            <p><strong>Owner Name:</strong> {submittedData?.ownerName}</p>
            <p><strong>Contact Number:</strong> {submittedData?.contactNumber}</p>
            <p><strong>Vehicle Model:</strong> {submittedData?.vehicleModel}</p>
            <p><strong>Registration Number:</strong> {submittedData?.registrationNumber}</p>
            <p><strong>Vehicle Color:</strong> {submittedData?.vehicleColor}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleRegistrationForm;
