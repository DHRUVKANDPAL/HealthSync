// app/api/hospitals-by-departments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { departments } = body;

    if (!Array.isArray(departments) || departments.length === 0) {
      return NextResponse.json(
        { error: "Invalid departments array" },
        { status: 400 }
      );
    }

    const hospitals = await prisma.hospital.findMany({
      where: {
        hospitaldep: {
          some: {
            name: {
              in: departments,
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
        },
      },
      include: {
        hospitaldep: {
          where: {
            name: {
              in: departments,
            },
            doctors: {
              some: {
                isAvailable: true,
              },
            },
          },
          include: {
            doctors: {
              where: {
                isAvailable: true,
              },
              include: {
                doctor: true,
              },
            },
          },
        },
      },
    });

    // Add this for debugging
   //  console.log(
   //    "First hospital departments:",
   //    hospitals.length > 0 ? hospitals[0].hospitaldep[0].doctors : "No hospitals found"
   //  );

    // Process the results with detailed hospital information and statistics
    const processedHospitals = hospitals.map((hospital:any) => {
      const departmentsWithStats = hospital.hospitaldep.map((dept:any) => {
        const fees = dept.doctors.map((doc:any) => doc.consulatationFees || 0);
        const availableDoctors = dept.doctors.filter((doc:any) => doc.isAvailable);

        return {
          departmentId: dept.id,
          departmentName: dept.name,
          hod: dept.hod,
         //  createdAt: dept.createdAt,
          statistics: {
            minFees: Math.min(...fees),
            maxFees: Math.max(...fees),
            averageFees: fees.reduce((a:any, b:any) => a + b, 0) / fees.length,
            totalDoctors: dept.doctors.length,
            availableDoctors: availableDoctors.length,
          },
          doctors: dept.doctors.map((doc:any) => ({
            doctorId: doc.doctor.id,
            name: doc.doctor.name,
            imageUrl: doc.doctor.imageUrl,
            // dob: doc.doctor.dob,
            // licenceNo: doc.doctor.licenceNo,
            contactno: doc.doctor.contactno,
            email: doc.doctor.email,
            consulationFees: doc.consulatationFees,
            isAvailable: doc.isAvailable,
            // assignedAt: doc.assignedAt,
            // createdAt: doc.doctor.createdAt,
          })),
        };
      });

      return {
        hospitalInfo: {
          id: hospital.id,
          name: hospital.name,
          imageUrl: hospital.imageUrl,
          licenceno: hospital.licenceno,
          estyear: hospital.estyear,
          Website: hospital.Website,
          contactno: hospital.contactno,
          alternatecontactno: hospital.alternatecontactno,
          email: hospital.email,
          address: hospital.address,
          City: hospital.City,
          State: hospital.State,
          Zipcode: hospital.Zipcode,
          facilities: {
            beds: {
              total: hospital.noofbeds,
              available: hospital.bedsAvailable,
              shared: hospital.sharedAvailable,
              generalWard: hospital.generalWardAvailable,
            },
            opd: {
              total: hospital.noofopds,
              available: hospital.opdsAvailable,
            },
            icu: {
              total: hospital.nooficu,
              available: hospital.icuAvailable,
            },
            labs: {
              total: hospital.nooflabs,
              available: hospital.labsAvailable,
            },
            doctors: {
              total: hospital.noofdoctorsregistered,
              available: hospital.doctorsAvailable,
            },
          },
          anyotherdetails: hospital.anyotherdetails,
         //  idToLogin: hospital.idToLogin,
          isVerified: hospital.isVerified,
         //  createdAt: hospital.createdAt,
         //  updatedAt: hospital.updatedAt,
        },
        statistics: {
          totalRelevantDepartments: departmentsWithStats.length,
          totalRelevantDoctors: departmentsWithStats.reduce(
            (sum:any, dept:any) => sum + dept.doctors.length,
            0
          ),
          averageFeesAcrossDepartments:
            departmentsWithStats.reduce(
              (sum:any, dept:any) => sum + dept.statistics.averageFees,
              0
            ) / departmentsWithStats.length,
          occupancyRates: {
            beds: (
              ((hospital.noofbeds - (hospital.bedsAvailable || 0)) /
                hospital.noofbeds) *
              100
            ).toFixed(1),
            opd: (
              ((hospital.noofopds - (hospital.opdsAvailable || 0)) /
                hospital.noofopds) *
              100
            ).toFixed(1),
            icu: (
              ((hospital.nooficu - (hospital.icuAvailable || 0)) /
                hospital.nooficu) *
              100
            ).toFixed(1),
            labs: (
              ((hospital.nooflabs - (hospital.labsAvailable || 0)) /
                hospital.nooflabs) *
              100
            ).toFixed(1),
          },
        },
        departments: departmentsWithStats,
      };
    });

    return NextResponse.json({
      totalHospitals: processedHospitals.length,
      hospitals: processedHospitals,
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
