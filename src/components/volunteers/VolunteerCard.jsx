import React from "react";
import { User, Mail, Phone } from "lucide-react";

const VolunteerCard = ({ volunteer }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {volunteer.name}
          </h3>
          {volunteer.createdAt && (
            <p className="text-sm text-gray-500">
              Joined: {formatDate(volunteer.createdAt)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700 break-all">{volunteer.email}</p>
        </div>

        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700">{volunteer.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;
