import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Save,
  Edit,
  Upload,
  School,
  Award,
  FileText,
  Download
} from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  // Profile data
  const [profile, setProfile] = useState({
    name: "Alex Peterson",
    email: "alex.peterson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New Delhi, India",
    organization: "Delhi Public School",
    role: "Physics Teacher",
    bio: "Physics educator with 8+ years of experience in preparing students for competitive exams like JEE and NEET. Specialized in creating effective assessment tools and question papers.",
    joinDate: "January 2020",
    education: [
      {
        degree: "M.Sc. in Physics",
        institution: "Delhi University",
        year: "2012-2014"
      },
      {
        degree: "B.Sc. in Physics",
        institution: "Mumbai University",
        year: "2009-2012"
      }
    ],
    achievements: [
      "Published 3 research papers on educational assessment",
      "Created over 200 question papers for competitive exams",
      "Workshop leader for 'Effective Question Creation' training",
      "Top-rated teacher award (2019, 2021)"
    ]
  });
  
  // Form state for editing
  const [formState, setFormState] = useState({...profile});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleEditMode = () => {
    if (editMode) {
      // Save changes
      setProfile(formState);
      toast({
        title: "Profile updated",
        description: "Your profile changes have been saved successfully.",
      });
    } else {
      // Enter edit mode
      setFormState({...profile});
    }
    setEditMode(!editMode);
  };
  
  const cancelEdit = () => {
    setFormState({...profile});
    setEditMode(false);
  };
  
  const handleUploadAvatar = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile picture upload will be available in the next update.",
    });
  };
  
  const downloadProfile = () => {
    toast({
      title: "Profile downloaded",
      description: "Your profile information has been downloaded.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-md">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src="" alt={profile.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-secondary text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <button 
                      onClick={handleUploadAvatar}
                      className="absolute bottom-0 right-0 p-1 rounded-full bg-primary text-white shadow-sm"
                    >
                      <Upload size={14} />
                    </button>
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {profile.role} at {profile.organization}
                  </CardDescription>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Member since {profile.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button 
                  variant={editMode ? "default" : "outline"} 
                  className="flex items-center"
                  onClick={toggleEditMode}
                >
                  {editMode 
                    ? <><Save className="mr-2 h-4 w-4" /> Save Changes</>
                    : <><Edit className="mr-2 h-4 w-4" /> Edit Profile</>
                  }
                </Button>
                {editMode && (
                  <Button 
                    variant="ghost" 
                    className="flex items-center"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                )}
                {!editMode && (
                  <Button 
                    variant="ghost" 
                    className="flex items-center"
                    onClick={downloadProfile}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="info">
                  <User className="w-4 h-4 mr-2" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="education">
                  <School className="w-4 h-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {editMode ? (
                        <Input 
                          id="name" 
                          name="name" 
                          value={formState.name} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {editMode ? (
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formState.email} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.email}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      {editMode ? (
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formState.phone} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      {editMode ? (
                        <Input 
                          id="location" 
                          name="location" 
                          value={formState.location} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.location}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      {editMode ? (
                        <Input 
                          id="organization" 
                          name="organization" 
                          value={formState.organization} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.organization}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="role">Role</Label>
                      {editMode ? (
                        <Input 
                          id="role" 
                          name="role" 
                          value={formState.role} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center mt-1 text-foreground">
                          <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                          {profile.role}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="bio">Bio</Label>
                  {editMode ? (
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      value={formState.bio} 
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-muted-foreground">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="mt-0">
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground mt-1">{edu.year}</p>
                        </div>
                        <Badge variant="outline" className="bg-primary/10">
                          {edu.year.split('-')[1]}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  
                  {editMode && (
                    <Button variant="outline" className="w-full">
                      + Add Education
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-0">
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Award size={16} />
                      </div>
                      <div>
                        <p className="text-foreground">{achievement}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {editMode && (
                    <Button variant="outline" className="w-full">
                      + Add Achievement
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="border-t border-border pt-6 flex justify-between">
            <p className="text-sm text-muted-foreground">Last updated: May 10, 2023</p>
            {editMode && (
              <Button variant="default" onClick={toggleEditMode}>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}