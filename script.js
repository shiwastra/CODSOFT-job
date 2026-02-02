
// Sample Job Data
const jobsData = [
    {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        category: "technology",
        location: "remote",
        salary: "INR 80,00,000.00 - INR 120,00,000.00",
        type: "Full-time",
        description: "We are seeking an experienced Full Stack Developer to join our growing team. You will work on cutting-edge web applications using modern technologies and frameworks.",
        requirements: "5+ years experience with JavaScript, React, Node.js, MongoDB. Strong problem-solving skills and ability to work in a team environment.",
        posted: "2 days ago",
        featured: true
    },
    {
        id: 2,
        title: "Digital Marketing Manager",
        company: "BrandBoost Agency",
        category: "marketing",
        location: "hybrid",
        salary: "INR 50,32,079.25 - INR 77,76,650.00",
        type: "Full-time",
        description: "Lead our digital marketing initiatives and drive brand awareness through innovative campaigns. Manage social media, SEO, and content strategy.",
        requirements: "3+ years in digital marketing, proven track record with SEO/SEM, social media management, and analytics tools. Excellent communication skills.",
        posted: "1 week ago",
        featured: true
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Creative Design Studio",
        category: "design",
        location: "onsite",
        salary: "INR 45,74,600.00 - INR 64,04,440.00",
        type: "Full-time",
        description: "Create stunning user experiences and interfaces for web and mobile applications. Work closely with developers to bring designs to life.",
        requirements: "4+ years experience with Figma, Adobe XD, user research, and prototyping. Portfolio showcasing mobile and web designs required.",
        posted: "3 days ago",
        featured: true
    },
    {
        id: 4,
        title: "Financial Analyst",
        company: "Global Finance Corp",
        category: "finance",
        location: "onsite",
        salary: "INR 50,32,079.25 - INR 77,76,650.00",
        type: "Full-time",
        description: "Analyze financial data, create reports, and provide insights to support business decisions. Work with cross-functional teams to drive financial performance.",
        requirements: "Bachelor's degree in Finance or Accounting, 3+ years experience in financial analysis, proficiency in Excel and financial modeling.",
        posted: "5 days ago",
        featured: true
    },
    {
        id: 5,
        title: "Frontend React Developer",
        company: "WebTech Innovations",
        category: "technology",
        location: "remote",
        salary: "INR 65,00,000.00 - INR 85,00,000.00",
        type: "Contract",
        description: "Build responsive and dynamic user interfaces using React. Collaborate with backend developers and designers to create seamless user experiences.",
        requirements: "3+ years with React, Redux, JavaScript ES6+, HTML5, CSS3. Experience with REST APIs and version control (Git).",
        posted: "1 day ago",
        featured: false
    },
    {
        id: 6,
        title: "Content Marketing Specialist",
        company: "Content Creators Inc",
        category: "marketing",
        location: "remote",
        salary: "INR 45,74,600.00 - INR 64,04,440.00",
        type: "Full-time",
        description: "Develop and execute content strategies across multiple channels. Create engaging blog posts, social media content, and marketing materials.",
        requirements: "2+ years in content marketing, excellent writing skills, SEO knowledge, experience with content management systems.",
        posted: "4 days ago",
        featured: false
    },
    {
        id: 7,
        title: "Product Designer",
        company: "Innovation Labs",
        category: "design",
        location: "hybrid",
        salary: "INR 75,00,000.00 - INR 91,49,200.00",
        type: "Full-time",
        description: "Lead product design from concept to launch. Conduct user research, create wireframes, and develop high-fidelity prototypes.",
        requirements: "5+ years in product design, expertise in design thinking methodology, proficiency with Sketch/Figma, strong portfolio.",
        posted: "1 week ago",
        featured: false
    },
    {
        id: 8,
        title: "Senior Accountant",
        company: "Accounting Partners LLC",
        category: "finance",
        location: "onsite",
        salary: "INR 50,32,079.25 - INR 77,76,650.00",
        type: "Full-time",
        description: "Manage financial records, prepare reports, and ensure compliance with regulations. Support month-end and year-end closing processes.",
        requirements: "CPA certification preferred, 4+ years accounting experience, knowledge of GAAP, proficiency with QuickBooks and Excel.",
        posted: "6 days ago",
        featured: false
    }
];

// Global State
let currentUser = null;
let filteredJobs = [...jobsData];
let userApplications = [];
let savedJobs = [];
let employerJobs = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedJobs();
    loadAllJobs();
    setupEventListeners();
    checkLoginStatus();
});

// Setup Event Listeners
function setupEventListeners() {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to section
            if (target !== '#') {
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Category and location filters
    document.getElementById('categoryFilter')?.addEventListener('change', filterJobs);
    document.getElementById('locationFilter')?.addEventListener('change', filterJobs);
}

// Load Featured Jobs
function loadFeaturedJobs() {
    const featuredJobsContainer = document.getElementById('featuredJobs');
    const featuredJobs = jobsData.filter(job => job.featured);
    
    featuredJobsContainer.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
}

// Load All Jobs
function loadAllJobs() {
    const jobsListContainer = document.getElementById('jobsList');
    jobsListContainer.innerHTML = filteredJobs.map(job => createJobListItem(job)).join('');
}

// Create Job Card (for featured jobs)
function createJobCard(job) {
    return `
        <div class="job-card" onclick="viewJobDetail(${job.id})">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                </div>
                <span class="job-badge">${job.type}</span>
            </div>
            <div class="job-details">
                <div class="job-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location.charAt(0).toUpperCase() + job.location.slice(1)}</span>
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${job.salary}</span>
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${job.posted}</span>
                </div>
            </div>
            <p class="job-description">${job.description.substring(0, 120)}...</p>
            <button class="btn-view-job" onclick="event.stopPropagation(); viewJobDetail(${job.id})">View Details</button>
        </div>
    `;
}

// Create Job List Item
function createJobListItem(job) {
    return `
        <div class="job-list-item" onclick="viewJobDetail(${job.id})">
            <div class="job-list-info">
                <h3 class="job-title">${job.title}</h3>
                <p class="company-name">${job.company}</p>
                <div class="job-details">
                    <span class="job-detail-item"><i class="fas fa-map-marker-alt"></i> ${job.location.charAt(0).toUpperCase() + job.location.slice(1)}</span>
                    <span class="job-detail-item"><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                    <span class="job-detail-item"><i class="fas fa-briefcase"></i> ${job.type}</span>
                </div>
            </div>
            <div class="job-list-actions">
                <button class="btn-view-job" onclick="event.stopPropagation(); viewJobDetail(${job.id})">View Details</button>
            </div>
        </div>
    `;
}

// View Job Detail 
function viewJobDetail(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    const modal = document.getElementById('jobDetailModal');
    const jobDetailBody = document.getElementById('jobDetailBody');
    
    const isSaved = savedJobs.includes(jobId);
    
    jobDetailBody.innerHTML = `
        <h2>${job.title}</h2>
        <p style="color: var(--primary-red); font-size: 1.2rem; margin-bottom: 1rem;">${job.company}</p>
        
        <div class="job-details" style="margin-bottom: 2rem;">
            <div class="job-detail-item" style="margin: 0.8rem 0;">
                <i class="fas fa-map-marker-alt"></i>
                <span><strong>Location:</strong> ${job.location.charAt(0).toUpperCase() + job.location.slice(1)}</span>
            </div>
            <div class="job-detail-item" style="margin: 0.8rem 0;">
                <i class="fas fa-dollar-sign"></i>
                <span><strong>Salary:</strong> ${job.salary}</span>
            </div>
            <div class="job-detail-item" style="margin: 0.8rem 0;">
                <i class="fas fa-briefcase"></i>
                <span><strong>Type:</strong> ${job.type}</span>
            </div>
            <div class="job-detail-item" style="margin: 0.8rem 0;">
                <i class="fas fa-tag"></i>
                <span><strong>Category:</strong> ${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</span>
            </div>
            <div class="job-detail-item" style="margin: 0.8rem 0;">
                <i class="fas fa-clock"></i>
                <span><strong>Posted:</strong> ${job.posted}</span>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--white); margin-bottom: 1rem;">Job Description</h3>
            <p style="color: var(--text-gray); line-height: 1.8;">${job.description}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--white); margin-bottom: 1rem;">Requirements</h3>
            <p style="color: var(--text-gray); line-height: 1.8;">${job.requirements}</p>
        </div>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn-submit" onclick="applyForJob(${job.id})" style="flex: 1;">
                <i class="fas fa-paper-plane"></i> Apply Now
            </button>
            <button class="btn-submit" onclick="toggleSaveJob(${job.id})" style="flex: 1; background: ${isSaved ? 'var(--dark-red)' : 'transparent'}; border: 2px solid var(--primary-red);">
                <i class="fas fa-heart"></i> ${isSaved ? 'Saved' : 'Save Job'}
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close Job Detail
function closeJobDetail() {
    document.getElementById('jobDetailModal').style.display = 'none';
}

// Apply for Job
function applyForJob(jobId) {
    if (!currentUser) {
        showNotification('Please login to apply for jobs');
        closeJobDetail();
        showLoginModal();
        return;
    }
    
    if (currentUser.type === 'employer') {
        showNotification('Employers cannot apply for jobs');
        return;
    }
    
    document.getElementById('applicationJobId').value = jobId;
    closeJobDetail();
    showApplicationModal();
}

// Show Application Modal
function showApplicationModal() {
    const modal = document.getElementById('applicationModal');
    if (currentUser) {
        document.getElementById('applicantName').value = currentUser.name || '';
        document.getElementById('applicantEmail').value = currentUser.email || '';
    }
    modal.style.display = 'block';
}

// Close Application Modal
function closeApplicationModal() {
    document.getElementById('applicationModal').style.display = 'none';
    document.getElementById('applicationForm').reset();
}

// Submit Application
function submitApplication(event) {
    event.preventDefault();
    
    const jobId = parseInt(document.getElementById('applicationJobId').value);
    const job = jobsData.find(j => j.id === jobId);
    
    const application = {
        id: Date.now(),
        jobId: jobId,
        jobTitle: job.title,
        company: job.company,
        applicantName: document.getElementById('applicantName').value,
        applicantEmail: document.getElementById('applicantEmail').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        coverLetter: document.getElementById('coverLetter').value,
        resume: document.getElementById('resumeUpload').files[0]?.name || 'resume.pdf',
        status: 'Submitted',
        appliedDate: new Date().toLocaleDateString()
    };
    
    userApplications.push(application);
    
    // Save to localStorage
    localStorage.setItem('userApplications', JSON.stringify(userApplications));
    
    closeApplicationModal();
    showNotification('Application submitted successfully! You will receive an email confirmation.');
    
    // Simulate email notification
    sendEmailNotification(application);
}

// Send Email Notification (Simulated)
function sendEmailNotification(application) {
    console.log('📧 Email Notification Sent:');
    console.log('To:', application.applicantEmail);
    console.log('Subject: Application Received - ' + application.jobTitle);
    console.log('Body: Thank you for applying to ' + application.jobTitle + ' at ' + application.company);
    console.log('Your application has been received and is under review.');
}

// Toggle Save Job
function toggleSaveJob(jobId) {
    if (!currentUser) {
        showNotification('Please login to save jobs');
        closeJobDetail();
        showLoginModal();
        return;
    }
    
    const index = savedJobs.indexOf(jobId);
    if (index > -1) {
        savedJobs.splice(index, 1);
        showNotification('Job removed from saved list');
    } else {
        savedJobs.push(jobId);
        showNotification('Job saved successfully');
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    viewJobDetail(jobId); // Refresh the modal
}

// Search Jobs
function searchJobs() {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    
    if (!searchTerm) {
        filteredJobs = [...jobsData];
    } else {
        filteredJobs = jobsData.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.category.toLowerCase().includes(searchTerm)
        );
    }
    
    loadAllJobs();
    
    // Scroll to jobs section
    document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
}

// Filter Jobs
function filterJobs() {
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;
    
    filteredJobs = jobsData.filter(job => {
        const categoryMatch = category === 'all' || job.category === category;
        const locationMatch = location === 'all' || job.location === location;
        return categoryMatch && locationMatch;
    });
    
    loadAllJobs();
}

// Authentication Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Simple authentication (in real app, this would be server-side)
    currentUser = {
        email: email,
        type: userType,
        name: email.split('@')[0]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeLoginModal();
    showNotification('Login successful!');
    updateUIAfterLogin();
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const userType = document.getElementById('signupUserType').value;
    
    currentUser = {
        name: name,
        email: email,
        type: userType
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeSignupModal();
    showNotification('Account created successfully!');
    updateUIAfterLogin();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    document.getElementById('candidateDashboard').style.display = 'none';
    document.getElementById('employerDashboard').style.display = 'none';
    document.querySelector('.btn-login').style.display = 'inline-block';
    document.querySelector('.btn-signup').style.display = 'inline-block';
    document.querySelector('.btn-profile').style.display = 'none';
    
    showNotification('Logged out successfully');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIAfterLogin();
    }
    
    // Load saved data
    const savedApplications = localStorage.getItem('userApplications');
    if (savedApplications) {
        userApplications = JSON.parse(savedApplications);
    }
    
    const savedJobsList = localStorage.getItem('savedJobs');
    if (savedJobsList) {
        savedJobs = JSON.parse(savedJobsList);
    }
}

function updateUIAfterLogin() {
    document.querySelector('.btn-login').style.display = 'none';
    document.querySelector('.btn-signup').style.display = 'none';
    document.querySelector('.btn-profile').style.display = 'inline-block';
}

function showUserDashboard() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    if (currentUser.type === 'candidate') {
        showCandidateDashboard();
    } else {
        showEmployerDashboard();
    }
}

// Candidate Dashboard Functions
function showCandidateDashboard() {
    document.getElementById('candidateDashboard').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('jobs').style.display = 'none';
    
    // Load profile data
    if (currentUser) {
        document.getElementById('profileName').value = currentUser.name || '';
        document.getElementById('profileEmail').value = currentUser.email || '';
    }
    
    loadApplications();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDashboardSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
    
    // Remove active class from all menu items
    document.querySelectorAll('.dashboard-menu-item').forEach(item => item.classList.remove('active'));
    
    // Show selected section
    if (section === 'profile') {
        document.getElementById('profileSection').style.display = 'block';
        document.querySelectorAll('.dashboard-menu-item')[0].classList.add('active');
    } else if (section === 'applications') {
        document.getElementById('applicationsSection').style.display = 'block';
        document.querySelectorAll('.dashboard-menu-item')[1].classList.add('active');
        loadApplications();
    } else if (section === 'saved') {
        document.getElementById('savedSection').style.display = 'block';
        document.querySelectorAll('.dashboard-menu-item')[2].classList.add('active');
        loadSavedJobs();
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    currentUser.name = document.getElementById('profileName').value;
    currentUser.email = document.getElementById('profileEmail').value;
    currentUser.phone = document.getElementById('profilePhone').value;
    currentUser.skills = document.getElementById('profileSkills').value;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showNotification('Profile updated successfully!');
}

function loadApplications() {
    const applicationsList = document.getElementById('applicationsList');
    
    if (userApplications.length === 0) {
        applicationsList.innerHTML = '<p style="color: var(--text-gray);">No applications yet. Start applying to jobs!</p>';
        return;
    }
    
    applicationsList.innerHTML = userApplications.map(app => `
        <div class="application-item">
            <h4 style="color: var(--white); margin-bottom: 0.5rem;">${app.jobTitle}</h4>
            <p style="color: var(--primary-red); margin-bottom: 0.5rem;">${app.company}</p>
            <div style="display: flex; gap: 1rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span style="color: var(--text-gray);"><i class="fas fa-calendar"></i> Applied: ${app.appliedDate}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-info-circle"></i> Status: ${app.status}</span>
            </div>
        </div>
    `).join('');
}

function loadSavedJobs() {
    const savedJobsList = document.getElementById('savedJobsList');
    
    if (savedJobs.length === 0) {
        savedJobsList.innerHTML = '<p style="color: var(--text-gray);">No saved jobs yet. Browse and save jobs you like!</p>';
        return;
    }
    
    const savedJobsData = jobsData.filter(job => savedJobs.includes(job.id));
    
    savedJobsList.innerHTML = savedJobsData.map(job => `
        <div class="saved-job-item" onclick="viewJobDetail(${job.id})">
            <h4 style="color: var(--white); margin-bottom: 0.5rem;">${job.title}</h4>
            <p style="color: var(--primary-red); margin-bottom: 0.5rem;">${job.company}</p>
            <div style="display: flex; gap: 1rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span style="color: var(--text-gray);"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
            </div>
            <button class="btn-view-job" onclick="event.stopPropagation(); viewJobDetail(${job.id})" style="margin-top: 1rem;">View Details</button>
        </div>
    `).join('');
}

// Employer Dashboard Functions
function showEmployerDashboard() {
    document.getElementById('employerDashboard').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('jobs').style.display = 'none';
    
    loadEmployerJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showEmployerSection(section) {
    // Hide all sections
    document.querySelectorAll('#employerDashboard .dashboard-section').forEach(s => s.style.display = 'none');
    
    // Remove active class from all menu items
    document.querySelectorAll('#employerDashboard .dashboard-menu-item').forEach(item => item.classList.remove('active'));
    
    // Show selected section
    if (section === 'account') {
        document.getElementById('accountSection').style.display = 'block';
        document.querySelectorAll('#employerDashboard .dashboard-menu-item')[0].classList.add('active');
    } else if (section === 'postjob') {
        document.getElementById('postjobSection').style.display = 'block';
        document.querySelectorAll('#employerDashboard .dashboard-menu-item')[1].classList.add('active');
    } else if (section === 'myjobs') {
        document.getElementById('myjobsSection').style.display = 'block';
        document.querySelectorAll('#employerDashboard .dashboard-menu-item')[2].classList.add('active');
        loadEmployerJobs();
    } else if (section === 'applicants') {
        document.getElementById('applicantsSection').style.display = 'block';
        document.querySelectorAll('#employerDashboard .dashboard-menu-item')[3].classList.add('active');
        loadApplicants();
    }
}

function updateEmployerAccount(event) {
    event.preventDefault();
    
    currentUser.companyName = document.getElementById('companyName').value;
    currentUser.companyEmail = document.getElementById('companyEmail').value;
    currentUser.companyWebsite = document.getElementById('companyWebsite').value;
    currentUser.companyAbout = document.getElementById('companyAbout').value;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showNotification('Account updated successfully!');
}

function postJob(event) {
    event.preventDefault();
    
    const newJob = {
        id: Date.now(),
        title: document.getElementById('jobTitle').value,
        company: currentUser.companyName || 'Your Company',
        category: document.getElementById('jobCategory').value,
        location: document.getElementById('jobLocation').value,
        salary: document.getElementById('jobSalary').value,
        type: 'Full-time',
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('jobRequirements').value,
        posted: 'Just now',
        featured: false,
        employerId: currentUser.email
    };
    
    employerJobs.push(newJob);
    jobsData.push(newJob);
    
    localStorage.setItem('employerJobs', JSON.stringify(employerJobs));
    
    document.getElementById('postJobForm').reset();
    showNotification('Job posted successfully!');
    showEmployerSection('myjobs');
}

function loadEmployerJobs() {
    const myJobsList = document.getElementById('myJobsList');
    
    const savedEmployerJobs = localStorage.getItem('employerJobs');
    if (savedEmployerJobs) {
        employerJobs = JSON.parse(savedEmployerJobs);
    }
    
    const userJobs = employerJobs.filter(job => job.employerId === currentUser.email);
    
    if (userJobs.length === 0) {
        myJobsList.innerHTML = '<p style="color: var(--text-gray);">No jobs posted yet. Create your first job posting!</p>';
        return;
    }
    
    myJobsList.innerHTML = userJobs.map(job => `
        <div class="my-job-item">
            <h4 style="color: var(--white); margin-bottom: 0.5rem;">${job.title}</h4>
            <div style="display: flex; gap: 1rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span style="color: var(--text-gray);"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-clock"></i> ${job.posted}</span>
            </div>
            <p style="color: var(--text-gray); margin: 1rem 0;">${job.description.substring(0, 100)}...</p>
        </div>
    `).join('');
}

function loadApplicants() {
    const applicantsList = document.getElementById('applicantsList');
    
    const employerJobIds = employerJobs
        .filter(job => job.employerId === currentUser.email)
        .map(job => job.id);
    
    const jobApplicants = userApplications.filter(app => employerJobIds.includes(app.jobId));
    
    if (jobApplicants.length === 0) {
        applicantsList.innerHTML = '<p style="color: var(--text-gray);">No applicants yet for your posted jobs.</p>';
        return;
    }
    
    applicantsList.innerHTML = jobApplicants.map(applicant => `
        <div class="applicant-item">
            <h4 style="color: var(--white); margin-bottom: 0.5rem;">${applicant.applicantName}</h4>
            <p style="color: var(--primary-red); margin-bottom: 0.5rem;">Applied for: ${applicant.jobTitle}</p>
            <div style="display: flex; gap: 1rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span style="color: var(--text-gray);"><i class="fas fa-envelope"></i> ${applicant.applicantEmail}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-phone"></i> ${applicant.applicantPhone}</span>
            </div>
            <div style="display: flex; gap: 1rem; margin: 0.5rem 0; flex-wrap: wrap;">
                <span style="color: var(--text-gray);"><i class="fas fa-calendar"></i> ${applicant.appliedDate}</span>
                <span style="color: var(--text-gray);"><i class="fas fa-file"></i> ${applicant.resume}</span>
            </div>
        </div>
    `).join('');
}

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const jobDetailModal = document.getElementById('jobDetailModal');
    const applicationModal = document.getElementById('applicationModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
    if (event.target === jobDetailModal) {
        closeJobDetail();
    }
    if (event.target === applicationModal) {
        closeApplicationModal();
    }
}

// Allow Enter key to search
document.getElementById('jobSearch')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchJobs();
    }
});