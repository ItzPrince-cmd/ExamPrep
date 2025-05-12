import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/theme/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { 
  Moon, 
  Sun, 
  Laptop, 
  BellRing, 
  Mail, 
  Shield, 
  Key, 
  Save, 
  RotateCcw, 
  Globe, 
  Eye
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Appearance settings
  const [fontSize, setFontSize] = useState(16);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [contrastMode, setContrastMode] = useState(false);
  
  // Privacy settings
  const [shareUsageData, setShareUsageData] = useState(true);
  const [showActivityStatus, setShowActivityStatus] = useState(true);
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Language settings
  const [language, setLanguage] = useState("english");
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };
  
  const resetSettings = () => {
    setEmailNotifications(true);
    setPushNotifications(true);
    setSoundEnabled(false);
    setFontSize(16);
    setAnimationsEnabled(true);
    setContrastMode(false);
    setShareUsageData(true);
    setShowActivityStatus(true);
    setTwoFactorEnabled(false);
    setLanguage("english");
    
    toast({
      title: "Settings reset",
      description: "Your settings have been reset to default values.",
    });
  };
  
  const handleThemeChange = (value: string) => {
    setTheme(value as "light" | "dark" | "system");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="bg-card rounded-xl shadow-md overflow-hidden">
          <Tabs defaultValue="appearance" className="w-full">
            <div className="border-b border-border">
              <div className="px-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-0 bg-transparent h-auto p-0 mt-2">
                  <TabsTrigger value="appearance" className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <Eye className="w-4 h-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <BellRing className="w-4 h-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger value="security" className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <Key className="w-4 h-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="language" className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-t-md data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <Globe className="w-4 h-4 mr-2" />
                    Language
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="p-6">
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      className={`p-4 rounded-lg border-2 ${theme === 'light' ? 'border-primary' : 'border-border'} cursor-pointer transition-all duration-200 hover:border-primary/70`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sun className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium">Light</span>
                        </div>
                        {theme === 'light' && (
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="mt-3 h-16 bg-white border border-gray-200 rounded-md"></div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-primary' : 'border-border'} cursor-pointer transition-all duration-200 hover:border-primary/70`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-5 w-5 text-indigo-400" />
                          <span className="font-medium">Dark</span>
                        </div>
                        {theme === 'dark' && (
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="mt-3 h-16 bg-gray-900 border border-gray-700 rounded-md"></div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 ${theme === 'system' ? 'border-primary' : 'border-border'} cursor-pointer transition-all duration-200 hover:border-primary/70`}
                      onClick={() => handleThemeChange('system')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Laptop className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">System</span>
                        </div>
                        {theme === 'system' && (
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="mt-3 h-16 bg-gradient-to-r from-white to-gray-900 rounded-md"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Font Size</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">A</span>
                      <Slider 
                        value={[fontSize]} 
                        onValueChange={(value) => setFontSize(value[0])} 
                        min={12} 
                        max={20} 
                        step={1}
                        className="w-64"
                      />
                      <span className="text-lg">A</span>
                      <span className="ml-4 text-sm text-muted-foreground">{fontSize}px</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="animations" 
                        checked={animationsEnabled}
                        onCheckedChange={setAnimationsEnabled}
                      />
                      <Label htmlFor="animations">Enable animations</Label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="contrast" 
                        checked={contrastMode}
                        onCheckedChange={setContrastMode}
                      />
                      <Label htmlFor="contrast">High contrast mode</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                      </div>
                      <Switch 
                        id="push-notifications" 
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sound-enabled" className="font-medium">Sound</Label>
                        <p className="text-sm text-muted-foreground">Play sound when notification is received</p>
                      </div>
                      <Switch 
                        id="sound-enabled" 
                        checked={soundEnabled}
                        onCheckedChange={setSoundEnabled}
                        disabled={!pushNotifications}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Activity Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity-status" className="font-medium">Show activity status</Label>
                        <p className="text-sm text-muted-foreground">Let others know when you're active</p>
                      </div>
                      <Switch 
                        id="activity-status" 
                        checked={showActivityStatus}
                        onCheckedChange={setShowActivityStatus}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Usage Data</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="usage-data" className="font-medium">Share usage data</Label>
                        <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                      </div>
                      <Switch 
                        id="usage-data" 
                        checked={shareUsageData}
                        onCheckedChange={setShareUsageData}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-factor Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="font-medium">Two-factor authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        id="two-factor" 
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button variant="default" className="mt-2">Update Password</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="language" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Display Language</h3>
                  <div className="max-w-xs">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={resetSettings} className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={saveSettings} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}