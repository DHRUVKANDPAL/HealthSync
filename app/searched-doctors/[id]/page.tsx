"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Globe,
  Languages,
  Mail,
  MapPin,
  Phone,
  Star,
  Video,
  Building2,
  Clock3,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  MapPinIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
  contactno: string;
  departments: { deptId: string; dept: { name: string } }[];
  bio: string;
  ratings: number;
  totalReviews: number;
  experience: number;
  languages: string[];
  achievements: string[];
  fees: { online: number; offline: number };
  hospital: {
    name: string;
    address: string;
    timings: string;
  };
  views: string;
}

const fallbackData: Doctor = {
  id: "",
  name: "Dr. John Doe",
  imageUrl: "/images/doctor.jpg",
  email: "john.doe@example.com",
  contactno: "123-456-7890",
  departments: [
    { deptId: "1", dept: { name: "Cardiology" } },
    {
      deptId: "2",
      dept: { name: "Neurology" },
    },
  ],
  bio: "Experienced and dedicated doctor with expertise in various fields.",
  ratings: 4.5,
  totalReviews: 150,
  experience: 10,
  languages: ["English", "Spanish"],
  achievements: ["Award 1", "Award 2", "Award 3"],
  fees: { online: 500, offline: 1000 },
  hospital: {
    name: "City Hospital",
    address: "123 Main Street, Anytown, CA 91234",
    timings: "9:00 AM - 5:00 PM",
  },
  views:
    "📌 Dr. Chandan Kumar, a Physician with 10 years of experience, currently practices at City Hospital, Anytown, CA. Rated 4.5★ by patients.You can tweak this format to include more details like availability, consultation fees, or contact info. Let me know if you need further refinements! 🚀",
};

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/fetchDoctorCardData/${id}`);
        const data = await response.json();
        setDoctor(data.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to load doctor profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctorData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  const profileData = {
    ...fallbackData,
    name: doctor?.name,
    imageUrl: doctor?.imageUrl,
    email: doctor?.email || fallbackData.hospital.name,
    contactno: doctor?.contactno || "Contact not available",
    departments: doctor?.departments || [],
  };
  const router = useRouter();
  const InfoCard = ({ icon: Icon, title, content }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Icon className="text-primary" size={24} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </motion.div>
  );
  async function handleOnlineBilling() {
    router.push(`/searched-doctors/${id}/onlineBilling`);
  }
  return (
    <>
      {/* <Header /> */}
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-[#1A202C] py-8">
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          {/* Header Section */}
          <Card className="border-none shadow-xl bg-white dark:bg-gray-800/50 overflow-hidden backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                {/* Left Column - Avatar and Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-1/4 space-y-4"
                >
                  <div className="relative group">
                    <Avatar className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl shadow-lg">
                      <AvatarImage
                        src={profileData.imageUrl}
                        alt={profileData.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                        {profileData?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute top-2 right-2 space-x-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full opacity-90 hover:opacity-100 bg-white dark:bg-gray-800 shadow-md"
                      >
                        <Heart className="h-5 w-5 text-primary" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full opacity-90 hover:opacity-100 bg-white dark:bg-gray-800 shadow-md"
                      >
                        <Share2 className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-primary p-4 rounded-lg shadow-md"
                  >
                    <Star className="text-primary-foreground" size={24} />
                    <div>
                      <span className="text-2xl font-bold text-primary-foreground">
                        {profileData.ratings}
                      </span>
                      <p className="text-sm text-primary-foreground/90">
                        ({profileData.totalReviews} reviews)
                      </p>
                    </div>
                  </motion.div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800/50 p-4 rounded-lg text-center shadow-md"
                    >
                      <Building2
                        className="mx-auto text-primary mb-2"
                        size={24}
                      />
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Experience
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {profileData.experience}+ Yrs
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800/50 p-4 rounded-lg text-center shadow-md"
                    >
                      <MessageCircle
                        className="mx-auto text-primary mb-2"
                        size={24}
                      />
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Consults
                      </p>
                      <p className="text-lg font-bold text-primary">10,000+</p>
                    </motion.div>
                  </div>

                  {/* Hospital Info */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="text-primary" size={20} />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {profileData.hospital.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {profileData.hospital.address}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="text-primary" size={16} />
                      {profileData.hospital.timings}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Doctor Info and Booking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:w-3/4 space-y-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Dr. {profileData.name}
                      </h1>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        Verified ✓
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData.departments.map((dept) => (
                        <Badge
                          key={dept.deptId}
                          variant="outline"
                          className="bg-white/50 dark:bg-gray-800/50 text-primary border-primary/20 hover:bg-primary/10"
                        >
                          {dept.dept.name}
                        </Badge>
                      ))}
                    </div>

                    <ScrollArea className="h-24 mb-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {profileData.bio}
                      </p>
                    </ScrollArea>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Mobile View - Consultation Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          className="w-full sm:hidden bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                          size="lg"
                        >
                          <Video className="mr-2 h-5 w-5" />
                          Book Consultation
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-96">
                        <div className="space-y-6 pt-6">
                          <h3 className="text-xl font-semibold text-center mb-4">
                            Choose Consultation Type
                          </h3>
                          <div className="grid gap-4">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg shadow-md">
                              <Video className="mr-3 h-6 w-6" />
                              Online Consultation (₹{profileData.fees.online})
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full border-primary text-primary hover:bg-primary/10 h-14 text-lg shadow-sm"
                            >
                              <Calendar className="mr-3 h-6 w-6" />
                              In-person Visit (₹{profileData.fees.offline})
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Desktop View - Direct Buttons */}
                    <Button
                      className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg shadow-lg"
                      onClick={handleOnlineBilling}
                    >
                      <Video className="mr-2 h-5 w-5" />
                      Book Online Consultation
                    </Button>
                    <Button
                      variant="outline"
                      className="hidden sm:flex border-primary text-primary hover:bg-primary/10 h-12 text-lg shadow-md"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule In-person Visit
                    </Button>
                  </div>

                  {/* Consultation Fees */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Video className="text-primary" size={20} />
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Online
                          </span>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          ₹{profileData.fees.online}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Video consultation
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-primary" size={20} />
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            In-person
                          </span>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          ₹{profileData.fees.offline}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Clinic visit
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <p className="text-md  text-gray-900 dark:text-gray-100">
                        {profileData.views}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800/50 rounded-lg p-1">
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-300"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="practice"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-300"
                  >
                    Practice
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-300"
                  >
                    Location
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-300"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card className="bg-white dark:bg-gray-800/50 shadow-lg">
                    <CardContent className="space-y-6 p-6">
                      <InfoCard
                        icon={Languages}
                        title="Languages Spoken"
                        content={profileData.languages.join(", ")}
                      />
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Key Achievements
                        </h3>
                        {profileData.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6 mt-6">
                  <Card className="bg-white dark:bg-gray-800/50 shadow-lg">
                    <CardContent className="space-y-6 p-6">
                      <InfoCard
                        icon={Globe}
                        title="Hospital"
                        content={profileData.hospital.name}
                      />
                      <InfoCard
                        icon={Clock3}
                        title="Timings"
                        content={profileData.hospital.timings}
                      />
                      <InfoCard
                        icon={Phone}
                        title="Phone"
                        content={doctor?.contactno}
                      />
                      <InfoCard
                        icon={Mail}
                        title="Email"
                        content={doctor?.email}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location">
                  <Card className="bg-white dark:bg-gray-800/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="aspect-video bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center overflow-hidden">
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                          >
                            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                            <span className="text-gray-600 dark:text-gray-300 text-lg">
                              Google Maps Integration
                            </span>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-inner"
                        >
                          <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mb-3">
                            Address
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-lg">
                            {profileData.hospital.address}
                          </p>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card className="bg-white dark:bg-gray-800/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="bg-primary/10 p-6 rounded-lg shadow-md"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <Star className="text-primary" size={40} />
                              <span className="text-4xl font-bold text-primary">
                                {profileData.ratings}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-gray-600 dark:text-gray-300">
                                out of 5 ({profileData.totalReviews} verified
                                reviews)
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="text-primary"
                                    size={20}
                                    fill={
                                      star <= Math.floor(profileData.ratings)
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Sample Reviews */}
                        {[1, 2, 3].map((review) => (
                          <motion.div
                            key={review}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: review * 0.1 }}
                            className="bg-white dark:bg-gray-800/50 rounded-lg p-6 space-y-3 hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors shadow-md"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    P{review}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                    Patient {review}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    2 weeks ago
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="text-primary"
                                    size={16}
                                    fill={star <= 5 ? "currentColor" : "none"}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                              Great experience with Dr. {profileData.name}. Very
                              professional and knowledgeable. The consultation
                              was thorough and they explained everything
                              clearly.
                            </p>
                          </motion.div>
                        ))}

                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary/10 text-lg h-12 shadow-md"
                        >
                          View All Reviews
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Side Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-white dark:bg-gray-800/50 sticky top-6 shadow-xl">
                <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Available Time Slots
                  </h2>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map(
                      (time) => (
                        <motion.div
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-3 border border-primary/20 rounded-lg bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 text-lg shadow-sm hover:shadow-md transition-shadow hover:bg-primary/5"
                        >
                          {time}
                        </motion.div>
                      )
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                      Next Available Dates
                    </h3>
                    <div className="space-y-2">
                      {["Tomorrow", "23 Feb", "24 Feb"].map((date) => (
                        <motion.div
                          key={date}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between p-3 border border-primary/20 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-primary/5 transition-colors"
                        >
                          <span className="text-gray-900 dark:text-gray-100">
                            {date}
                          </span>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            4 slots
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorProfile;
