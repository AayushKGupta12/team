"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function InternshipApplication() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    graduationYear: "",
    cgpa: "",
    duration: "",
    domain: "",
    instagram: false,
    linkedin: false
  })

  const handleSubmit = () => {
    if (!formData.instagram || !formData.linkedin) {
      alert("Please follow both pages to proceed.")
      return
    }

    // Call backend here
    console.log("Submitting...")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-2xl font-semibold mb-6">
          Internship Application – Vfound.in
        </h1>

        {/* SECTION 1 */}
        <Section title="1. Student Details">
          <Input label="First Name" />
          <Input label="Last Name" />
          <Input label="Email ID" />
          <Input label="Contact Number" />
          <Input label="University Name" />
          <Input label="Course (B.Tech / BCA / BSC)" />
          <Input label="Graduating Year" />
          <Input label="CGPA" />
        </Section>

        {/* SECTION 2 */}
        <Section title="2. Internship Duration & Domain">
          <Select label="Select Duration">
            <option>30 Days</option>
            <option>45 Days</option>
            <option>60 Days</option>
          </Select>

          <Select label="Domain Expertise">
            <option>Data Science</option>
            <option>Machine Learning</option>
            <option>Data Analyst</option>
            <option>Software Engineering</option>
            <option>CyberSecurity</option>
            <option>Artificial Intelligence</option>
            <option>Cloud Computing</option>
            <option>DevOps</option>
          </Select>
        </Section>

        {/* SECTION 3 */}
        <Section title="3. Legal & Social Validation">
          <p className="text-sm text-gray-600 mb-4">
            Updates will be sent on Email & LinkedIn profile.
          </p>

          <div className="space-y-2">
            <Checkbox label="I have followed the official Instagram page" />
            <Checkbox label="I have followed the official LinkedIn page" />
          </div>
        </Section>

        {/* SECTION 4 */}
        <Section title="4. Important Notice">
          <p className="text-gray-600">
            Successful validation requires 3 working days.
            Make sure you follow our LinkedIn page for updates.
          </p>
        </Section>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Submit Application
        </button>

      </div>
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

function Input({ label }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  )
}

function Select({ label, children }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select className="w-full border rounded-lg px-3 py-2">
        {children}
      </select>
    </div>
  )
}

function Checkbox({ label }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" className="accent-black" />
      {label}
    </label>
  )
}