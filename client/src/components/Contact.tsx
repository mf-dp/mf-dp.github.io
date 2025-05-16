import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedinIn, FaGithub, FaTwitter, FaDribbble } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Define form schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    subject: z.string().min(2, {
      message: "Subject must be at least 2 characters.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }),
  });

  // Form hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast({
        title: t('contact.form.success'),
        description: `Thank you ${values.name}, I'll get back to you soon!`,
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: t('contact.form.error'),
        description: "Please try again later or contact me through other channels.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('contact.title')}
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="md:w-1/2 space-y-6" variants={itemVariants}>
            <p className="text-gray-700 dark:text-gray-300">
              {t('contact.description')}
            </p>
            
            <div className="flex items-start gap-4">
              <div className="text-primary text-xl mt-1"><FaEnvelope /></div>
              <div>
                <h3 className="text-lg font-medium">{t('contact.emailLabel')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('contact.email')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-primary text-xl mt-1"><FaPhone /></div>
              <div>
                <h3 className="text-lg font-medium">{t('contact.phoneLabel')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('contact.phone')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-primary text-xl mt-1"><FaMapMarkerAlt /></div>
              <div>
                <h3 className="text-lg font-medium">{t('contact.locationLabel')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('contact.location')}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">{t('contact.socialLabel')}</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                  <FaGithub />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                  <FaDribbble />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.name')}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.subject')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I'd like to discuss a project opportunity..."
                          className="resize-none" 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                </Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
