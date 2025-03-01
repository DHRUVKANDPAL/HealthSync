import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";
import { cookies } from "next/headers";
const adapter = new PrismaAdapter(prisma.doctorSession, prisma.doctor);
export const doctorlucia = new Lucia(adapter, {
  sessionCookie: {
    name: "doctor-auth-cookie",
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(1, "d"),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
    };
  },
});
declare module "lucia" {
  interface Register {
    Lucia: typeof doctorlucia;
    DatabaseUserAttributes: {
      id: string;
    };
  }
}
export const getDoctor = async () => {
  const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await doctorlucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await doctorlucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await doctorlucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}
    const dbUser = await prisma?.doctor?.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        licenceNo: true,
        imageUrl:true,
        dob:true,
        aadharNo:true,
        email:true,
        departments:{
          select: {
            dept:{
              select:{
                name:true,
              }
            },
            deptId:true
          }
        },
      },
    });
    return dbUser;

};
export const verifyDoctorDetails = async () => {
  const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await doctorlucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await doctorlucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await doctorlucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}
    return {id:user?.id};
};


export const verifydoctor = async () => {
  const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await doctorlucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await doctorlucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await doctorlucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    
    return {id:user?.id};

};