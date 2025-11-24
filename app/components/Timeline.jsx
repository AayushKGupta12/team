import React from 'react';
import { Star, Eye, Snowflake, Heart, DollarSign, Mic } from 'lucide-react';

export default function CompaniesTimeline() {

  return (
    <div className="bg-white">

        {/* === Trusted By Section === */}
      <section className="bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#0d2440] mb-16">
            Trusted by Leading Companies
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-12 items-center justify-items-center">
            <img
              src="https://img.logo.dev/microsoft.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Microsoft"
              className="h-18 md:h-18"
            />
            <img
              src="https://img.logo.dev/google.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Google"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/zomato.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Walmart"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/salesforce.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Salesforce"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/dolby.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Swiggy"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/nvidia.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>

            <img
              src="https://img.logo.dev/walmart.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/ibm.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/infosys.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/stripe.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/meta.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
            <img
              src="https://img.logo.dev/americanexpress.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="Zomato"
              className="h-18 md:h-18"/>
          </div>
        </div>
      </section>

    </div>
  );
}