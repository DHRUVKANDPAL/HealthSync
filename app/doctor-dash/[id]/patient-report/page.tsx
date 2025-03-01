"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const sampleData = {
  "patient_data": {
    "name": "Anmol Mishra",
    "uhid": "2105561",
    "age": "21",
    "sex": "Male",
    "date": "28/02/2025",
    "chief_complaints": "Excessive sneezing x 1 year",
    "aggravating_factor": "Change in weather",
    "present_illness": "No h/o nasal block/bleed",
    "family_history": "Mother has allergic rhinitis",
    "surgical_history": "No",
    "examination": "Nasal mucosa mild congested, Throat-granular pharyngitis",
    "clinical_impression": "Allergic rhinitis with granular pharyngitis"
  },
  "hospital_data": {
    "name": "HealthSync Hospital",
    "address": "Ludhiana, Punjab, India",
    "phone": "+91-161-XXXXXXX",
    "email": "info@healthsync.com",
    "website": "www.healthsync.com",
    "emergency": "+91-161-XXXXXXX",
    "footer": {
      "name": "Fortis Hospital",
      "address": "Chandigarh Road, Ludhiana",
      "email": "contactus.ludhiana@fortishealthcare.com",
      "phone": "+91-161-5222333"
    }
  },
  "doctor_data": {
    "name": "Dr. Anmol Rattan Kath",
    "degree": "MBBS, MS (Otorhinolaryngology), Fellowship (Head and Neck Surgery)",
    "speciality": "Consultant, Head and Neck Surgery",
    "mobile": "+91 95015 87435",
    "email": "anmol.kath@fortishealthcare.com",
    "pmc": "46528"
  },
  "advice_data": [
    {
      "name": "Fluticasone Nasal Spray",
      "dosage": "2 sprays BD",
      "details": "Use twice daily, morning and evening."
    },
    {
      "name": "Cetirizine Tablets",
      "dosage": "10mg OD",
      "details": "Take once daily in the morning."
    },
    {
      "name": "Montelukast Tablets",
      "dosage": "10mg HS",
      "details": "Take at bedtime."
    },
    {
      "name": "Saline Nasal Drops",
      "dosage": "2 drops in each nostril TID",
      "details": "Use three times a day."
    },
    {
      "name": "Paracetamol Tablets",
      "dosage": "500mg QID PRN",
      "details": "Take as needed for pain or fever, up to four times a day."
    },
    {
      "name": "Ibuprofen Tablets",
      "dosage": "400mg TID PRN",
      "details": "Take three times a day as needed for pain."
    },
    {
      "name": "Amoxicillin Capsules",
      "dosage": "500mg TID",
      "details": "Take three times a day for 7 days."
    },
    {
      "name": "Clarithromycin Tablets",
      "dosage": "250mg BD",
      "details": "Take twice a day for 7 days."
    },
    {
      "name": "Prednisone Tablets",
      "dosage": "10mg OD",
      "details": "Take once daily in the morning for 5 days, then taper as directed."
    }
  ],
  "previous_reports": [
    {
      "date": "2024-12-15",
      "hospital": "Regional Clinic",
      "consultation": "Mild congestion, advised saline nasal spray."
    },
    {
      "date": "2025-01-10",
      "hospital": "City Hospital",
      "consultation": "Symptoms improved, continue current treatment."
    },
    {
      "date": "2025-02-05",
      "hospital": "City Hospital",
      "consultation": "New complaint of ear pain, prescribed ear drops."
    },
    {
      "date": "2025-03-01",
      "hospital": "City Hospital",
      "consultation": "Discussed allergy management plan, recommended environmental control measures."
    },
    {
      "date": "2025-04-15",
      "hospital": "City Hospital",
      "consultation": "Annual check-up, general health good, advised healthy lifestyle."
    },
    {
      "date": "2025-05-20",
      "hospital": "City Hospital",
      "consultation": "Persistent cough, Chest X-ray ordered."
    },
    {
      "date": "2025-05-25",
      "hospital": "City Hospital",
      "consultation": "X-ray results reviewed, no significant findings, cough medication prescribed."
    },
    {
      "date": "2025-06-10",
      "hospital": "City Hospital",
      "consultation": "Follow-up for cough, cough improving, continue medication."
    },
    {
      "date": "2025-07-01",
      "hospital": "City Hospital",
      "consultation": "Routine check-up, allergic symptoms well controlled."
    },
    {
      "date": "2025-08-10",
      "hospital": "City Hospital",
      "consultation": "Discussed travel plans, provided travel health advice."
    },
    {
      "date": "2025-09-05",
      "hospital": "City Hospital",
      "consultation": "Seasonal allergies, adjusted allergy medication."
    },
    {
      "date": "2025-10-01",
      "hospital": "City Hospital",
      "consultation": "Follow-up for allergies, symptoms responding well to treatment."
    },
    {
      "date": "2025-11-15",
      "hospital": "City Hospital",
      "consultation": "Flu vaccination administered."
    },
    {
      "date": "2025-12-20",
      "hospital": "City Hospital",
      "consultation": "Discussed stress management techniques, recommended relaxation exercises."
    },
    {
      "date": "2026-01-10",
      "hospital": "City Hospital",
      "consultation": "Occasional headaches, advised over-the-counter pain relief."
    }
  ]
}
export default function Page() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    "patient_data": {
      "name": "",   // set these values !!
      "uhid": "",   // set these values !!
      "age": "",    // set these values !!
      "sex": "",   // set these values !!
      "date": new Date().toLocaleDateString('en-GB').replace(/\//g, '/'), // toLocaleDateString('en-GB') → Formats the date as DD/MM/YYYY (British format).
      "chief_complaints": "",
      "aggravating_factor": "",
      "present_illness": "",
      "family_history": "", // set these values !!
      "surgical_history": "", // set these values !!
      "examination": "",
      "clinical_impression": "",
    },
    "hospital_data": {
      "name": "", // set these values !!
      "address": "", // set these values !!
      "phone": "", // set these values !!
      "email": "", // set these values !!
      "website": "", // set these values !!
      "emergency": "", // set these values !!
      "footer": {
        "name": "", // set these values !!
        "address": "", // set these values !!
        "email": "", // set these values !!
        "phone": "" // set these values !!
      }
    },
    "doctor_data": {
      "name": "", // set these values !!
      "degree": "",  // set these values !!
      "speciality": "", // set these values !!
      "mobile": "", // set these values !!
      "email": "", // set these values !!
      "pmc": "" // set these values !!
    },
    "advice_data": [
      {
        "name": "",
        "dosage": "",
        "details": ""
      }
    ],
    "previous_reports": [ // set these values !!
      {
        "date": "",
        "hospital": "",
        "consultation": ""
      }
    ]
  });
  const [newAdviceData, setnewAdviceData] = useState({
    "name": "",
    "dosage": "",
    "details": ""
  });

  const submitReport = async (reportUrl: string) => {
    try {
      const res = await fetch(reportUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to generate report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
    } 
  }

  const addAdvice = () => {
    console.log("running add data")
    setFormData({
      ...formData,
      advice_data: [...formData.advice_data, newAdviceData]
    })
    setnewAdviceData({
      "name": "", "dosage": "", "details": ""
    })
  }

  useEffect(() => {
    setFormData(sampleData); // change this !!
  }, [])

  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <span className="text-gray">Chief Complaints: </span>
          <input className="text-black" type="text" value={formData.patient_data.chief_complaints} onChange={(e) => setFormData({ ...formData, patient_data: { ...formData.patient_data, chief_complaints: e.target.value } })}/>
        </div>
        <div>
          <span className="text-gray">aggravating factors: </span>
          <input className="text-black" type="text" value={formData.patient_data.aggravating_factor} onChange={(e) => setFormData({ ...formData, patient_data: { ...formData.patient_data, aggravating_factor: e.target.value } })}/>
        </div>
        <div>
          <span className="text-gray">present illness: </span>
          <input className="text-black" type="text" value={formData.patient_data.present_illness} onChange={(e) => setFormData({ ...formData, patient_data: { ...formData.patient_data, present_illness: e.target.value } })}/>
        </div>
        <div>
          <span className="text-gray">examination: </span>
          <input className="text-black" type="text" value={formData.patient_data.examination} onChange={(e) => setFormData({ ...formData, patient_data: { ...formData.patient_data, examination: e.target.value } })}/>
        </div>
        <div>
          <span className="text-gray">clinical impression: </span>
          <input className="text-black" type="text" value={formData.patient_data.clinical_impression} onChange={(e) => setFormData({ ...formData, patient_data: { ...formData.patient_data, clinical_impression: e.target.value } })}/>
        </div>
      </form>
      
      <br /><br /><br />

      <form action="" className="flex flex-col gap-4">
        <div>
          <span className="text-gray">name: </span>
          <input className="text-black"type="text" value={newAdviceData.name} onChange={(e) => setnewAdviceData({ ...newAdviceData, name: e.target.value })}/>
        </div>
        <div>
          <span className="text-gray">dosage: </span>
          <input className="text-black"type="text" value={newAdviceData.dosage} onChange={(e) => setnewAdviceData({ ...newAdviceData, dosage: e.target.value })}/>
        </div>
        <div>
          <span className="text-gray">details: </span>
          <input className="text-black"type="text" value={newAdviceData.details} onChange={(e) => setnewAdviceData({ ...newAdviceData, details: e.target.value })}/>
        </div>
        <button onClick={addAdvice} type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md">add medication</button>
        <div>
          <button onClick={() => {submitReport("https://report-generator-3moj.onrender.com/generate_main_report")}} type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md">generate current report</button>
          <button onClick={() => {submitReport("https://report-generator-3moj.onrender.com/generate_previous_reports")}} type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md">generate past report</button>
        </div>
      </form>

      <br /><br /><br />

      <h1 className="text-gray">Medications: </h1>
      <table>
        <th>
          <tr>
            <th>name</th> <th>dosage</th> <th>details</th>
          </tr>
        </th>

        {
          formData.advice_data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.dosage}</td>
                <td>{item.details}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}
