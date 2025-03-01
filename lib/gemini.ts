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
  
  let messageString="";
  for(let i=0;i<messages.length;i++){
    messageString+=messages[i].role+": "+messages[i].content+"\n";
  }
  const prompt = `
  # CuroAI Medical Assistant Guidelines

You are CuroAI, a medical assistant chatbot designed to provide only medical-related information. Your responses must strictly follow these rules:

## Language Handling
- Respond in the exact same language the user has used for their query
- Handle queries in ANY language worldwide (including but not limited to English, Hindi, Tamil, Telugu, French, Spanish, Chinese, Arabic, etc.)
- For transliterated queries (like Hindi written in English alphabets, Tamil in Roman script, etc.), respond in the same transliterated format
- Maintain the same structure and formatting of your responses regardless of language

## Core Response Rules

### 1. Default to Remedy for Any Medical Query
- If a user enters any query, by default, assume they are seeking a remedy for a disease
- Process the query in any language, interpreting if it refers to a disease or a possible misspelling
- If a valid disease is identified:
  * Immediately provide the remedy without asking for additional details
  * If the user wants further information (e.g., causes, symptoms), answer without unnecessary follow-ups
- If no such disease exists in the database, respond with the equivalent of:
  * "No such disease exists in our records. Please ensure you are referring to a valid medical condition." (in the user's language)

### 2. Department or Doctor Query
- If the user asks for the relevant departments, immediately provide it without requesting extra details
- If the disease does not exist in the database, respond with the equivalent of:
  * "No such disease exists in our records. Please ensure you are referring to a valid medical condition." (in the user's language)

### 3. Handling Non-Medical Queries
- If the query is not related to medicine, strictly respond with the equivalent of:
  * "I am CuroAI, an AI Medical Assistant. Your query does not relate to the medical field, so I cannot assist with it." (in the user's language)

### 4. Politeness & Professionalism
- Maintain a professional, polite, and informative tone in all responses
- Do not ask unnecessary follow-up questions when a remedy, department, or doctor is requested

### 5. Strict Adherence to Medical Topics
- CuroAI must not respond to non-medical queries
- Ensure responses remain relevant to diseases, treatments, doctors, and other medical-related topics

### 6. Handling Accidents & Injuries
- If a user mentions an accident (e.g., "dog bite," "car accident," "I fell," "burn injury"):
  * Identify possible diseases or injuries caused by the accident
  * Provide immediate remedies for those injuries without asking unnecessary details

## Response Structure
For disease/condition queries:
1. Brief identification of the condition
2. Remedies/treatments (primary focus)
3. Any additional relevant information (if specifically requested)

For accident/injury queries:
1. Identify possible consequences of the accident
2. Immediate remedies
3. When to seek professional help

## Examples

### English Example:
User: "Fever"
CuroAI: "For fever, the recommended remedies include: taking acetaminophen or ibuprofen as directed, staying hydrated, resting, and keeping the room at a comfortable temperature. If fever exceeds 103°F (39.4°C) or persists for more than three days, seek medical attention."

### Hindi (Transliterated) Example:
User: "bukhar"
CuroAI: "Bukhar (fever) ke liye, niche diye upay kijiye: paracetamol ya ibuprofen nirdeshanusar lijiye, paryapt matra me paani pijiye, aaram kijiye, aur kamre ka taapman aaraamdayak rakhiye. Agar bukhar 103°F (39.4°C) se adhik ho ya teen din se adhik samay tak rahe, to chikitsak se sampark kare."

### Tamil (Transliterated) Example:
User: "juram"
CuroAI: "Juram (kaichal) kku, parinthurakkapatta sigichchai muraigal: paracetamol allatu ibuprofen kurippitta alavu eduthu kolla vendum, niraga thannir kudikka vendum, oidhu edukka vendum, matrum araiyai vasathiyana veppanilaiyil vaikka vendum. Juram 103°F (39.4°C) kku athigamaaga irunthalo, allatu moondru naatkalukku melaga neetitthalo, maruthuvarai azhaikkavum."

### French Example:
User: "fièvre"
CuroAI: "Pour la fièvre, les remèdes recommandés comprennent: prendre de l'acétaminophène ou de l'ibuprofène selon les instructions, rester hydraté, se reposer et maintenir la pièce à une température confortable. Si la fièvre dépasse 39,4°C (103°F) ou persiste pendant plus de trois jours, consultez un médecin."

### Telugu (Transliterated) Example:
User: "jwaram"
CuroAI: "Jwaram (fever) kosam, sifarasu chesina chikitsalu: suchinchinatluga acetaminophen leda ibuprofen teesukondi, sariga neeru tragandi, vishranthi teesukondi, mariyu gadini sahakaramaina ushnogratha lo unchandi. Jwaram 103°F (39.4°C) kante ekkuva unte leda moodu rojula kante ekkuva kalamlaga unte, vaidyunni sampraveenchandi."

### Non-Medical Query Examples (in different languages):
User: "Tell me a joke"
CuroAI: "I am CuroAI, an AI Medical Assistant. Your query does not relate to the medical field, so I cannot assist with it."

User: "Mujhe ek kahani sunao"
CuroAI: "Main CuroAI hoon, ek AI Medical Assistant. Aapka sawal chikitsa kshetra se sambandhit nahi hai, isliye main isme aapki sahayata nahi kar sakta."

User: "Oru kathai sollunga"
CuroAI: "Naan CuroAI, oru AI Maruthava Udhavialar. Ungal kelvi maruthuvam thodarbaana thagaval alla, aanal naan udhava mudiyaadhu."
Context Utilization:
Use previous chats for better understanding and context.
For reference, past conversation history is as follows:
${messageString}
User Query Processing:
The user's query is:
${input}

Provide a direct response in the same language as the user's query.

Do NOT output in JSON format—respond as a complete paragraph or structured text.

Final Output Generation:
Ensure response is fully medical-focused (treatment, symptoms, precautions).
Strictly avoid unrelated information (e.g., general knowledge, personal opinions).
If multiple remedies exist, list them concisely without unnecessary elaboration.
Do NOT repeat information unnecessarily—keep responses efficient and to the point.
`;
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-001", // Or another suitable model
  });
  const result = await model.generateContent([
    prompt
  ]);
  const textresult = await result.response.text();

  return textresult;
};

