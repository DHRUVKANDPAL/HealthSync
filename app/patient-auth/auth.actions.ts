"use server";
import { SignUpSchema } from "@/components/Signup";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { SigninSchema } from "@/components/Signin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const existingpatient = await prisma.patient.findUnique({
      where: {
        aadharno:values.aadharno
      },
    });
    if (existingpatient) {
      return { error: "patient already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const patient = await prisma.patient.create({
      data: {
        email: values.email.toLowerCase(),
        hashedPassword: hashedPassword,
        name: values.username,
        gender:values.gender,
        dob:values.dob,
        aadharno:values.aadharno,
        bloodgroup:values.bloodgroup,
        contactno:values.contactno,
        alternatecontactno:values.alternatecontactno,
        address:values.address,
        emergencycontact:values.emregencycontact,
        prevHis:values.prevHis
      },
    });
    const session = await lucia.createSession(patient.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: patient.id };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};



export const signIn = async (values: z.infer<typeof SigninSchema>) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        aadharno:values.aadharno
      },
    });
    if (!patient || !patient.hashedPassword) {
      return { success: false, error: "Invalid Credentials!" };
    }
    const passwordMatch = await new Argon2id().verify(
      patient.hashedPassword,
      values.password
    );
    if (!passwordMatch) {
      return { success: false, error: "Invalid Credentials!" };
    }
  
    const session = await lucia.createSession(patient.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: patient.id };
  } catch (error) {
    console.log("Error in auth.actions.ts",error)
    return { success: false };
  }
};

export const logout=async()=>{
   try {
      const sessionCookie = await lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      redirect("/patient-auth")
   } catch (error) {
    console.log("Error")
   }
  //  location.reload();
   revalidatePath("/patient-dash")
}

export const image=async()=>{
  try {
    
  } catch (error) {
    
  }
}