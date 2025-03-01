import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";
import { cookies } from "next/headers";


const adapter = new PrismaAdapter(prisma.hospitalSession, prisma.hospital);

export const hospitallucia = new Lucia(adapter, {
  sessionCookie: {
    name: "hospital-auth-cookie",
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
    Lucia: typeof hospitallucia;
    DatabaseUserAttributes: {
      id: string;
    };
  }
}


export const verifyhospital = async () => {
  const sessionId = cookies().get(hospitallucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await hospitallucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await hospitallucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await hospitallucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    
    return {id:user?.id};

};



export const getHospital = async () => {
  const sessionId = cookies().get(hospitallucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await hospitallucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await hospitallucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await hospitallucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    const dbUser = await prisma?.hospital?.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        licenceno: true,
        estyear: true,
        Website: true,
        contactno: true,
        alternatecontactno: true,
        email: true,
        address: true,
        City: true,
        State: true,
        Zipcode: true,
        // noofbeds: true,
        // noofopds: true,
        // nooficu: true,
        // nooflabs: true,
        // noofdoctorsregistered: true,
        anyotherdetails: true,
        hashedPassword: true,
        bedsAvailable: true,
        opdsAvailable: true,
        icuAvailable: true,
        labsAvailable: true,
        doctorsAvailable: true,
        sharedAvailable:true,
        generalWardAvailable:true,
        idToLogin: true,
        isVerified: true,
        hospitaldep: true,
        session: true,
        createdAt: true,
        updatedAt: true,
        room:true,
        roomHistory:true,
      },
    });
    return dbUser;

};



export const getEssentialHospitalDetails = async () => {
  const sessionId = cookies().get(hospitallucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await hospitallucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await hospitallucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await hospitallucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    const dbUser = await prisma?.hospital?.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        Website: true,
        contactno: true,
        alternatecontactno: true,
        email: true,
        address: true,
        City: true,
        State: true,
        Zipcode: true,
        bedsAvailable: true,
        opdsAvailable: true,
        icuAvailable: true,
        labsAvailable: true,
        doctorsAvailable: true,
        sharedAvailable:true,
        generalWardAvailable:true,
        idToLogin: true,
        isVerified: true,
      },
    });
    return dbUser;

};



export const verifyHospitalDetails = async () => {
  const sessionId = cookies().get(hospitallucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await hospitallucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await hospitallucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await hospitallucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    
    return {id:user?.id};

};