import fs from 'fs';
import path from 'path';

// Interface for certificate information
export interface CertificateInfo {
  organizer: string;
  location: string;
  dateRange: string;
  conferenceTitle: string;
  certificateType: string;
  role: string;
  topic: string;
}

/**
 * Extract information from certificate images based on file name patterns
 * This is a simple approach for demonstration purposes
 */
export async function extractCertificateInfo(imagePath: string): Promise<CertificateInfo> {
  // Extract the filename from the path
  const fileName = path.basename(imagePath);
  
  // Strip the extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  
  // Parse date patterns from filename
  const dateMatch = nameWithoutExt.match(/(\d{4})\.(\d{2})\.(\d{2})(?:-(\d{2}))?/);
  let dateRange = "";
  
  if (dateMatch) {
    const year = dateMatch[1];
    const month = dateMatch[2];
    const day = dateMatch[3];
    const endDay = dateMatch[4] || null;
    
    // Format the date range
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const monthName = months[parseInt(month) - 1];
    
    if (endDay) {
      dateRange = `${monthName} ${parseInt(day)}-${parseInt(endDay)}, ${year}`;
    } else {
      dateRange = `${monthName} ${parseInt(day)}, ${year}`;
    }
  }
  
  // Determine organizer based on common patterns in the certificates
  let organizer = "Unknown Organization";
  let location = "Unknown Location";
  let conferenceTitle = "Unknown Conference";
  let certificateType = "Certificate of Participation";
  let role = "Attendee";
  let topic = "Academic Research";
  
  // TELLSI Conference pattern
  if (fileName.includes("TELLSI") || nameWithoutExt.includes("2021.03.09-10")) {
    organizer = "Teaching English Language and Literature Society of Iran (TELLSI)";
    location = "Tarbiat Modares University, Tehran, Iran";
    conferenceTitle = "International TELLSI Conference";
    certificateType = "Certificate of Presentation";
    role = "Presenter";
    topic = "Language Education Research";
  } 
  // 2019 November Conference
  else if (nameWithoutExt.includes("2019.11.20-21")) {
    organizer = "Iran University of Science and Technology";
    location = "Tehran, Iran";
    conferenceTitle = "International Conference on English Language Teaching and Learning";
    certificateType = "Certificate of Contribution";
    role = "Contributor";
    topic = "Language Education Methodologies";
  }
  // 2019 October Conference
  else if (nameWithoutExt.includes("2019.10.25")) {
    organizer = "TELLSI (Teaching English Language and Literature Society of Iran)";
    location = "Islamic Azad University, Tabriz Branch, Iran";
    conferenceTitle = "17th International TELLSI Conference";
    certificateType = "Certificate of Presentation";
    role = "Presenter";
    topic = "Language Teaching and Research";
  }
  // 2019 January-February Conference
  else if (nameWithoutExt.includes("2019.01-02.30-01")) {
    organizer = "University of Tehran - Faculty of Education";
    location = "Tehran University, Iran";
    conferenceTitle = "International Conference on Scientific Research and Methodology";
    certificateType = "Certificate of " + 
      (nameWithoutExt.endsWith("01") ? "Participation" :
       nameWithoutExt.endsWith("02") ? "Excellence" : "Presentation");
    role = nameWithoutExt.endsWith("01") ? "Active Participant" :
           nameWithoutExt.endsWith("02") ? "Distinguished Contributor" : "Paper Presenter";
    topic = "Research Methodology in Education";
  }
  // 2018 November Conference
  else if (nameWithoutExt.includes("2018.11.14-16")) {
    organizer = "Shiraz University";
    location = "Shiraz University, Iran";
    conferenceTitle = "International Conference on Educational Research and Practice";
    certificateType = "Certificate of Excellence";
    role = "Distinguished Participant";
    topic = "Educational Research";
  }
  // 2018 September Conference
  else if (nameWithoutExt.includes("2018.09.04-05")) {
    organizer = "Tehran University";
    location = "Tehran University, Iran";
    conferenceTitle = "Advanced Research Methodologies Conference";
    certificateType = "Certificate of Attendance";
    role = "Attendee";
    topic = "Research Methodologies";
  }
  // 2018 April Conference
  else if (nameWithoutExt.includes("2018.04.25-27")) {
    organizer = "University of Isfahan";
    location = "University of Isfahan, Iran";
    conferenceTitle = "Scientific Research Workshop and Symposium";
    certificateType = "Certificate of Participation";
    role = "Participant";
    topic = "Scientific Research Methods";
  }
  // 2017 January Conference
  else if (nameWithoutExt.includes("2017.01.25-27")) {
    organizer = "Tehran University";
    location = "Tehran University, Iran";
    conferenceTitle = "Academic Research and Methodology Conference";
    certificateType = "Certificate of Presentation";
    role = "Presenter";
    topic = "Academic Research Methods";
  }
  // 2016 November Conference
  else if (nameWithoutExt.includes("2016.11.16-18")) {
    organizer = "University of Tabriz";
    location = "University of Tabriz, Iran";
    conferenceTitle = "International Conference on Educational Research and Development";
    certificateType = "Certificate of Attendance";
    role = "Attendee";
    topic = "Educational Research and Development";
  }
  // 2016 May Conference
  else if (nameWithoutExt.includes("2016.05.12-13")) {
    organizer = "Tehran University";
    location = "Tehran University, Iran";
    conferenceTitle = "Advanced Research Methodology Workshop";
    certificateType = "Certificate of Completion";
    role = "Participant";
    topic = "Research Methodology";
  }
  // 2015 November Conference
  else if (nameWithoutExt.includes("2015.11.17-19")) {
    organizer = "Tehran University";
    location = "Tehran University, Iran";
    
    if (nameWithoutExt.endsWith("01")) {
      conferenceTitle = "Academic Writing and Research Publication Conference";
      certificateType = "Certificate of Participation";
      role = "Participant";
      topic = "Academic Writing and Research Publication";
    } else if (nameWithoutExt.endsWith("02")) {
      conferenceTitle = "Data Analysis and Bibliometrics Workshop";
      certificateType = "Certificate of Completion";
      role = "Participant";
      topic = "Data Analysis and Bibliometrics";
    } else if (nameWithoutExt.endsWith("03")) {
      conferenceTitle = "International Research Methodology and Data Analysis Conference";
      certificateType = "Certificate of Presentation";
      role = "Presenter";
      topic = "Research Methodology and Data Analysis";
    } else if (nameWithoutExt.endsWith("04")) {
      conferenceTitle = "Scientific Research and Publication Symposium";
      certificateType = "Certificate of Excellence";
      role = "Distinguished Participant";
      topic = "Scientific Research and Publication";
    }
  }
  
  return {
    organizer,
    location,
    dateRange,
    conferenceTitle,
    certificateType,
    role,
    topic
  };
}

/**
 * Analyze all certificates in public folder
 */
export async function analyzeAllCertificates(): Promise<{[key: string]: CertificateInfo}> {
  const basePath = 'public/images/conferences';
  const results: {[key: string]: CertificateInfo} = {};
  
  if (!fs.existsSync(basePath)) {
    console.error(`Path ${basePath} does not exist`);
    return results;
  }
  
  const files = fs.readdirSync(basePath);
  
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(basePath, file);
      const info = await extractCertificateInfo(filePath);
      results[file] = info;
    }
  }
  
  return results;
}