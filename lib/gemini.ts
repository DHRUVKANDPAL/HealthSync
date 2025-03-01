import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function triage(userInput: string) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );

    const schema = {
      description: "Medical triage response",
      type: SchemaType.OBJECT,
      properties: {
        user_input: {
          type: SchemaType.STRING,
          description: "The original input text provided by the patient.",
        },
        possible_departments: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
            description: "Possible hospital departments.",
          },
        },
        interpration: {
          type: SchemaType.STRING,
          description:
            "One line description of what u understood about the patient's symptoms.",
        },
      },
      required: ["user_input", "possible_departments", "interpration"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Or another suitable model
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      `You are a professional medical triage assistant. Given a patient's symptom description, determine the most suitable hospital departments. 

Response Format:
Return a JSON object with the following keys:
- "user_input": The original input text provided by the patient.
- "possible_departments": An array of all recognized names for departments that could be relevant to the symptoms, including abbreviations or common names.
- "interpretation": A brief, one-line description of what you understand about the patient's symptoms.

Guidelines:
1. Use only recognized hospital departments from the following list:
General Practitioner (GP)
Physician
Orthopedics
Cardiology
Gastroenterology
Neurology
Dermatology
Pediatrics
Otolaryngology (ENT)
Psychiatry
Radiology
Oncology
Pulmonology
Endocrinology
Nephrology
Urology
Obstetrics and Gynecology (OB/GYN)
Rheumatology
Infectious Disease
Hematology
Anesthesiology
Emergency Medicine
Pathology
Physical Therapy / Rehabilitation
Nutrition / Dietary Services
Surgery
Plastic Surgery
Vascular Surgery
Trauma Surgery
Critical Care / ICU
Dentistry
Geriatrics
Palliative Care
Sleep Medicine
Sports Medicine
Pain Management
Podiatry
Speech-Language Pathology
Occupational Therapy
Ophthalmology (Eye Care)
Optometry
Allergy and Immunology
Medical Genetics
Family Medicine
Tropical Medicine
Neurosurgery
Neonatology
Viral Hepatitis
Pediatric Surgery
Chiropractic Medicine
2. If the symptoms are general or unclear, classify them under "General Practitioner" or "Physician".
3. If a symptom could apply to multiple departments, list all relevant ones in "possible_departments" (e.g., for chest pain, you could list ["Physician", "Cardiologist", "Gastroenterologist"]).
4. Use recognized names and abbreviations for departments (e.g., "Otolaryngology" can also be referred to as "ENT").
5. Understand input in multiple languages (English, Hindi, Hinglish, slang, etc.), and provide appropriate department(s). For example, slang terms like "pair ghisad gaya" could result in multiple departments such as "Physician", "Orthopedics", or "General Practitioner".
6. Ensure the response is in strict English.

Examples:

Example 1:
Input: "Pet dard ho rha h"
Output:
{
  "user_input": "Pet dard ho rha h",
  "possible_departments": ["Gastroenterology"],
  "interpretation": "Patient is experiencing abdominal pain, possibly due to indigestion, infection, or other underlying causes."
}

Example 2:
Input: "Kaan me dard hai"
Output:
{
  "user_input": "Kaan me dard hai",
  "possible_departments": ["ENT", "Otolaryngology"],
  "interpretation": "Patient is experiencing ear pain, which could be due to an ear infection, injury, or other conditions like sinus issues."
}

Example 3:
Input: "I have a fever and headache"
Output:
{
  "user_input": "I have a fever and headache",
  "possible_departments": ["General Practitioner", "Physician"],
  "interpretation": "Patient is experiencing fever, which could indicate an infection, inflammation, or other underlying health conditions."
}

Example 4:
Input: "Pair ghisad gaya"
Output:
{
  "user_input": "Pair ghisad gaya",
  "possible_departments": ["Physician", "Orthopedics", "General Practitioner"],
  "interpretation": "Patient's leg is injured, possibly due to a scrape, bruise, or sprain, requiring attention for potential swelling or pain."
}

Example 5:
{
  "user_input": "Jee machal rha h",
  "possible_departments": ["General Practitioner", "Physician", "Psychiatry", "Gastroenterology", "Neurology"],
  "interpretation": "Patient is experiencing discomfort or unease, possibly due to anxiety or the sensation of nausea, which might lead to vomiting."
}


***IMPORTANT NOTE: Accuracy is the key provide appropriate responses.***


Input: "${userInput}"` // Inject the user's input
    );

    const responseText = result.response.text();

    // Attempt to parse the JSON.  If it fails, provide a default.
    try {
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Raw response:", responseText); // Log the raw response for debugging

      return {
        user_input: userInput,
        possible_departments: ["General Practitioner", "Physician"], // Default if JSON parsing fails
      };
    }
  } catch (error) {
    console.error("Error in triage:", error);
    return {
      user_input: userInput,
      possible_departments: ["General Practitioner", "Physician"], // Default in case of error
    };
  }
}

// Example usage:
// async function testTriage() {
//   const input1 = "muscle pain";
//   const output1 = await triage(input1);
//   console.log(JSON.stringify(output1, null, 2));
// }

// testTriage();

export async function curoAIResponse(userInput: string) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );

    const schema = {
      description: "Curo AI Response",
      type: SchemaType.OBJECT,
      properties: {
        user_input: {
          type: SchemaType.STRING,
          description:
            "A suitable title to the original input text provided by the patient in title Case.",
        },
        interpretation: {
          type: SchemaType.OBJECT,
          description:
            "Understanding of the patient's symptoms and possible causes.",
          properties: {
            summary: {
              type: SchemaType.STRING,
              description:
                "A brief explanation of what could be causing the symptoms.",
            },
          },
          required: ["summary"],
        },
        home_remedies: {
          type: SchemaType.OBJECT,
          description: "List of suggested home remedies for symptom relief.",
          properties: {
            detailed_explanation: {
              type: SchemaType.STRING,
              description:
                "Explanation of how home remedies can help manage symptoms.",
            },
            remedies: {
              type: SchemaType.ARRAY,
              description:
                "A list of home remedies with their respective details.",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: {
                    type: SchemaType.STRING,
                    description: "Name of the home remedy.",
                  },
                  description: {
                    type: SchemaType.STRING,
                    description:
                      "Instructions on how to use the remedy and its benefits.",
                  },
                },
                required: ["name", "description"],
              },
            },
          },
          required: ["detailed_explanation", "remedies"],
        },
        precautions: {
          type: SchemaType.OBJECT,
          description:
            "Precautions to prevent worsening of symptoms or further infections.",
          properties: {
            detailed_explanation: {
              type: SchemaType.STRING,
              description:
                "Explanation of why these precautions are important.",
            },
            precaution_list: {
              type: SchemaType.ARRAY,
              description: "A list of necessary precautions for the patient.",
              items: {
                type: SchemaType.STRING,
              },
            },
          },
          required: ["detailed_explanation", "precaution_list"],
        },
        when_to_see_doctor: {
          type: SchemaType.OBJECT,
          description: "Guidelines on when medical attention is necessary.",
          properties: {
            detailed_explanation: {
              type: SchemaType.STRING,
              description:
                "Explanation of when a patient should consider seeing a doctor.",
            },
            red_flags: {
              type: SchemaType.ARRAY,
              description:
                "A list of severe symptoms that require medical attention.",
              items: {
                type: SchemaType.STRING,
              },
            },
            after_how_many_days: {
              type: SchemaType.ARRAY,
              description:
                "Time-based guidance on when to seek medical attention.",
              items: {
                type: SchemaType.STRING,
              },
            },
          },
          required: [
            "detailed_explanation",
            "red_flags",
            "after_how_many_days",
          ],
        },
        relevant_medical_departments: {
          type: SchemaType.ARRAY,
          description:
            "List of medical departments the patient may need to consult.",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              department: {
                type: SchemaType.STRING,
                description: "The name of the relevant medical department.",
              },
              description: {
                type: SchemaType.STRING,
                description:
                  "Brief explanation of when to consult this department.",
              },
            },
            required: ["department", "description"],
          },
        },
        language_adaptation: {
          type: SchemaType.OBJECT,
          description: "Language detection and response adaptation.",
          properties: {
            instruction: {
              type: SchemaType.STRING,
              description:
                "Detects the user's language and generates responses accordingly.",
            },
          },
          required: ["instruction"],
        },
      },
      required: [
        "user_input",
        "interpretation",
        "home_remedies",
        "precautions",
        "when_to_see_doctor",
        "relevant_medical_departments",
        "language_adaptation",
      ],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001", // Or another suitable model
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const result = await model.generateContent(
      `Given a set of symptoms, generate a highly detailed and structured response covering the following aspects:

User Input : Provide a suitable title in title Case to the user's Input in the language asked.

Interpretation: Clearly state the detected symptoms and their possible medical implications in simple terms.

Home Remedies:

Provide a detailed explanation of how home remedies can help, including natural treatments, dietary changes, lifestyle modifications, and over-the-counter solutions.
Follow this with a point-wise list of effective remedies.
Precautions:

Explain why precautions are necessary and how they can help prevent worsening of symptoms.
Follow this with a point-wise list of precautions, including habits to avoid, dietary restrictions, and lifestyle adjustments.
When to See a Doctor:

Give a detailed explanation of warning signs that require medical attention.
Provide a point-wise list of severe symptoms (red flags) that indicate immediate concern.
After How Many Days to Visit a Doctor:

Specify in a separate point the number of days after which a doctor should be consulted if symptoms persist or worsen.
Relevant Medical Departments:

List all possible medical specialties relevant to the symptoms, ensuring multiple departments are suggested if symptoms overlap (e.g., General Physician, Gastroenterology, Orthopedics, Cardiology, Dermatology, Neurology, etc.).
Language Adaptation:

Detect the language in which the question is asked (English, Hindi, Hinglish, or any other).
Ensure the response is generated in the same language to maintain user convenience.
The response should be extremely detailed and informative, ensuring the user gets a complete answer without needing further clarification.

Example output 
{
  "interpretation": {
    "summary": "You are experiencing a sore throat and mild fever, which could be due to a viral infection like the common cold, flu, or even seasonal allergies. If persistent, it may indicate a bacterial infection like strep throat. Other possible causes include exposure to allergens, dry air, acid reflux, or postnasal drip."
  },
  "home_remedies": {
    "detailed_explanation": "Home remedies can help manage mild symptoms, reduce throat inflammation, boost immunity, and provide comfort. A combination of warm fluids, natural anti-inflammatory ingredients, and proper rest can help in faster recovery. These remedies aim to soothe the throat, reduce irritation, and fight off possible infections.",
    "remedies": [
      {
        "name": "Saltwater Gargle",
        "description": "Dissolve 1 teaspoon of salt in a glass of warm water and gargle for 30 seconds, 2-3 times a day. This helps reduce throat swelling, loosen mucus, and flush out irritants."
      },
      {
        "name": "Honey and Ginger Tea",
        "description": "Mix 1 teaspoon of honey with fresh ginger juice in warm water or tea. Honey acts as a natural antibacterial agent, while ginger has anti-inflammatory properties that soothe the throat."
      },
      {
        "name": "Steam Inhalation",
        "description": "Inhale steam from a bowl of hot water with added eucalyptus oil for 5-10 minutes. This helps clear congestion, reduce throat dryness, and ease breathing difficulties."
      },
      {
        "name": "Turmeric Milk",
        "description": "Drink a glass of warm milk with 1 teaspoon of turmeric before bed. Turmeric has powerful anti-inflammatory and antimicrobial properties that help reduce throat pain."
      },
      {
        "name": "Herbal Teas",
        "description": "Chamomile, licorice, or peppermint teas can provide natural relief by soothing the throat, reducing cough, and boosting immunity."
      },
      {
        "name": "Stay Hydrated",
        "description": "Drink warm water, soups, and broths to keep your throat moist and reduce irritation. Avoid caffeinated or sugary drinks as they may worsen dehydration."
      },
      {
        "name": "Rest & Sleep",
        "description": "Adequate rest allows your immune system to fight off infections effectively. Avoid overexertion and ensure 7-9 hours of sleep per night."
      }
    ]
  },
  "precautions": {
    "detailed_explanation": "Taking proper precautions can prevent your condition from worsening and reduce the chances of spreading the infection to others. These steps help in maintaining hygiene, preventing further irritation, and supporting recovery.",
    "precaution_list": [
      "Avoid consuming cold foods and drinks like ice cream or carbonated beverages, as they can irritate the throat.",
      "Wear a mask if you are coughing or sneezing to prevent spreading germs.",
      "Wash your hands frequently with soap and water to prevent the spread of infections.",
      "Avoid smoking, alcohol, and spicy foods, as they can further irritate the throat lining.",
      "Use a humidifier to maintain indoor air moisture and prevent dryness in your throat.",
      "Limit talking or straining your voice to avoid further aggravating your throat.",
      "Avoid exposure to dust, pollution, and allergens, which may worsen symptoms."
    ]
  },
  "when_to_see_doctor": {
    "detailed_explanation": "While mild throat infections and fever can often be managed at home, certain symptoms indicate a more serious condition that requires medical evaluation. Delaying treatment may lead to complications such as bacterial infections, severe inflammation, or respiratory issues.",
    "red_flags": [
      "Persistent throat pain lasting more than 4-5 days, despite home treatments.",
      "High fever (above 101°F/38.5°C) that does not subside with medication.",
      "Difficulty swallowing, breathing, or opening your mouth fully.",
      "Swollen lymph nodes in the neck, accompanied by persistent fever.",
      "White patches, pus, or ulcers on the tonsils, which may indicate strep throat.",
      "Hoarseness or voice loss lasting more than 2 weeks.",
      "Coughing up blood or thick mucus with an unusual color (yellow/green).",
      "Severe fatigue, body aches, or an unexplained rash along with throat pain."
    ],
    "after_how_many_days": [
      "If mild symptoms persist for more than **3-4 days** without any improvement, consult a doctor.",
      "If you have a fever above 101°F (38.5°C) that does not improve within **24-48 hours**, seek medical advice.",
      "For severe symptoms such as **difficulty breathing, swallowing, or chest pain**, seek **immediate emergency care**.",
      "If you experience recurring sore throats (more than 5-6 times in a year), visit an **ENT specialist** to rule out chronic infections or tonsillitis."
    ]
  },
  "relevant_medical_departments": [
    {
      "department": "General Physician",
      "description": "For initial consultation, diagnosis, and general medication for mild infections."
    },
    {
      "department": "ENT Specialist (Otolaryngologist)",
      "description": "For persistent throat infections, tonsillitis, sinus issues, and voice-related problems."
    },
    {
      "department": "Pulmonologist",
      "description": "For severe cough, breathing difficulties, and symptoms related to the respiratory system."
    },
    {
      "department": "Allergist/Immunologist",
      "description": "If symptoms are triggered by allergens like pollen, dust, or food intolerances."
    },
    {
      "department": "Gastroenterologist",
      "description": "For throat discomfort caused by acid reflux or GERD (gastroesophageal reflux disease)."
    }
  ],
  "language_adaptation": {
    "instruction": "Detect the language in which the question is asked (English, Hindi, Hinglish, or any other) and ensure the response is generated in the same language."
  }
}


Input Symptoms: "${userInput}"` // Inject the user's input
    );

    const responseText = result.response.text();

    try {
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Raw response:", responseText); // Log the raw response for debugging

      return {
        interpretation: "",
      };
    }
  } catch (error) {
    console.error("Error in triage:", error);
    return {
      interpretation: "", // Default in case of error
    };
  }
}

export const curoFlash = async (input:any,messages:any) => {
  const prompt = `You are CureAI, a medical assistant chatbot designed to provide only medical-related information. Your responses must strictly follow these rules:

You are MedAI, an intelligent, conversational AI specialized in symptom analysis, medical guidance, and health-related inquiries. You act as a triage assistant, offering possible medical departments based on symptoms and providing comprehensive details about diseases, medicines, treatments, side effects, and preventive measures.

Core Functionalities:

Symptom-Based Triage: Identify all possible medical departments related to the symptoms provided by the user.
Disease Insights: Provide a detailed breakdown of possible conditions, including their causes, symptoms, severity, risk factors, and treatment approaches.
Medicine Information: Explain the use, dosage, side effects, interactions, and precautions for any medicine.
General Health Queries: Answer questions related to first aid, diet, mental health, fitness, preventive healthcare, and chronic disease management.
Multilingual Support: Always respond in the language the user asks the question in, ensuring accessibility for all users.
Medical Slang Recognition: Understand casual or slang terms for symptoms (e.g., "pet kharab hai" → Digestive issues, "pair ghisad gaya" → Injury).
Clear Disclaimer: Inform users that you are an AI assistant and not a replacement for professional medical advice.
DO NOT GIVE ANYTHING IRRELEVANT INFORMATION OR ANY OTHER INFORMATION THAT IS NOT RELATED TO HEALTHCARE .

*** FOR CONTEXT USE PREVIOUS CHATS AS :  ${messages}

*** PROVIDE RESPONSE FOR USER QUERY : ${input}

*** IMPORTANT NOTE : JUST PROVIDE THE OUTPUT NOTHING ELSE PLEASE I.E RESPONSE ONLY 

** GIVE RESPONSE IN THE SAME LANGUAGE AS THE USER ASKED THE QUESTION IN.

** IMPORTANT : USER QUERY IS : ${input}
** DO NOT GIVE OUTPUT IN JSON GIVE AS A COMPLETE PARA / TEXT


EXAMPLE : 
User: "पेट दर्द हो रहा है, क्या करें?"
MedAI Response (Hindi):
🤕 संभावित कारण:
पेट दर्द कई कारणों से हो सकता है, जैसे:

एसिडिटी (Acidity): पेट में जलन, डकारें आना, खट्टा लगना।
गैस (Gas): पेट फूलना, भारीपन, दर्द का उठना-बैठना।
फूड पॉइजनिंग (Food Poisoning): उल्टी, दस्त, कमजोरी के साथ पेट दर्द।
अपेंडिसाइटिस (Appendicitis) [गंभीर]: नाभि के पास दर्द जो दाईं ओर शिफ्ट हो जाए।
पथरी (Kidney/Gallbladder Stones): अचानक तेज दर्द, उल्टी, पेशाब में जलन।
🩺 संभावित विभाग:

गैस्ट्रोएंटरोलॉजी (Gastroenterology): अगर पेट दर्द बार-बार हो रहा है या कोई पुरानी समस्या है।
जनरल फिजीशियन (General Physician): हल्की गैस, अपच, या एसिडिटी से जुड़ी समस्या हो तो।
सर्जरी (Surgery): अगर अपेंडिसाइटिस, पथरी, या कोई गंभीर दर्द हो।
💡 क्या करें?
✅ एसिडिटी या गैस हो तो:

गुनगुना पानी पिएं, अदरक या पुदीना की चाय लें।
ज्यादा तला-भुना और मसालेदार खाने से बचें।
एंटासिड (Gelusil, Eno) लें अगर बहुत जलन हो रही हो।
✅ फूड पॉइजनिंग हो तो:

खूब पानी पिएं और ORS लें।
हल्का खाना खाएं, जैसे खिचड़ी या दलिया।
बार-बार उल्टी या डायरिया हो तो तुरंत डॉक्टर को दिखाएं।
✅ तेज दर्द हो, लगातार बना रहे या बढ़ता जाए तो:

तुरंत डॉक्टर से संपर्क करें, खासकर अगर बुखार, उल्टी या पेशाब में जलन हो।
📌 (डिस्क्लेमर: यह केवल सामान्य जानकारी है, कृपया गंभीर समस्या होने पर डॉक्टर से संपर्क करें।) 🚑


`;
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Or another suitable model
  });
  const result = await model.generateContent([
    prompt
  ]);
  const textresult = await result.response.text();

  return textresult;
};

