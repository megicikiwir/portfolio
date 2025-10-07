document.addEventListener("DOMContentLoaded", () => {
  // Sembunyikan loading screen setelah halaman dimuat
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
    }
  }, 500)

  // Inisialisasi Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileLinks = document.querySelectorAll(".mobile-link")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      const icon = mobileMenuBtn.querySelector("i")
      const isOpen = !mobileMenu.classList.contains("hidden")
      icon.setAttribute("data-lucide", isOpen ? "x" : "menu")
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })
  }

  // Tutup mobile menu saat link diklik
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      const icon = mobileMenuBtn.querySelector("i")
      icon.setAttribute("data-lucide", "menu")
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })
  })

  // Efek navbar saat scroll
  const navbar = document.getElementById("navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  // Active navigation link
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 100 // Tambah offset karena navbar lebih tinggi
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Text reveal animation
  const revealElements = document.querySelectorAll(".reveal-text")
  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add("active")
      }
    })
  }
  
  revealOnScroll()
  window.addEventListener("scroll", revealOnScroll)

  // Skill progress bars animation
  const skillBars = document.querySelectorAll(".skill-progress")
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      if (barTop < window.innerHeight && barTop > 0) {
        const width = bar.getAttribute("data-width")
        bar.style.width = width
      }
    })
  }
  
  animateSkillBars()
  window.addEventListener("scroll", animateSkillBars)

  // Parallax effect
  const parallaxElements = document.querySelectorAll(".parallax-layer")
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Interactive cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")
  
  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY
      
      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`
      
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" })
    })
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button, .hover-scale")
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "scale(1.5)"
        cursorOutline.style.opacity = "0.8"
      })
      
      element.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "scale(1)"
        cursorOutline.style.opacity = "0.5"
      })
    })
  }

  // Magnetic button effect
  const magneticButtons = document.querySelectorAll(".magnetic-btn")
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const position = btn.getBoundingClientRect()
      const x = e.clientX - position.left - position.width / 2
      const y = e.clientY - position.top - position.height / 2
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`
    })
    
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px) scale(1)"
    })
  })

  // Animation on scroll for other elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".bg-card, section").forEach((el) => {
    observer.observe(el)
  })

  // Add stagger animation to reveal text elements
  const addStaggerAnimation = () => {
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      const revealTexts = section.querySelectorAll(".reveal-text")
      revealTexts.forEach((text, index) => {
        text.style.transitionDelay = `${index * 0.1}s`
      })
    })
  }
  
  addStaggerAnimation()
})

// GitHub API functionality
async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const username = 'megicikiwir';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch GitHub projects');
        
        const repos = await response.json();
        
        // Filter out specific repos if needed
        const filteredRepos = repos.filter(repo => 
            repo.name === 'kopi_ellion' || 
            repo.name === 'Design' || 
            repo.name === 'elion_absensi'
        );
        
        // Clear loading indicator
        projectsContainer.innerHTML = '';
        
        if (filteredRepos.length === 0) {
            projectsContainer.innerHTML = `
                <div class="text-center py-12 col-span-full">
                    <p class="text-muted-foreground">Tidak ada proyek yang ditemukan.</p>
                </div>
            `;
            return;
        }
        
        // Create project cards for each repo
        filteredRepos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
        });
        
        // Re-initialize reveal animation for new elements
        const revealElements = projectsContainer.querySelectorAll('.reveal-text');
        revealOnScroll();
        
        // Re-initialize Lucide icons for new elements
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsContainer.innerHTML = `
            <div class="text-center py-12 col-span-full">
                <p class="text-muted-foreground">Gagal memuat proyek. Silakan coba lagi nanti.</p>
            </div>
        `;
    }
}

// Function to create a project card from repo data
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover-scale shadow-lg reveal-text';
    
    // Generate a placeholder image with repo name
    const imageUrl = `https://via.placeholder.com/600x400/3b82f6/ffffff?text=${encodeURIComponent(repo.name)}`;
    
    // Format description (limit to 100 characters)
    const description = repo.description 
        ? (repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description)
        : 'Tidak ada deskripsi tersedia.';
    
    // Format language
    const language = repo.language || 'Unknown';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${repo.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="space-y-3">
                <h3 class="text-xl sm:text-2xl font-bold text-white">${repo.name}</h3>
                <p class="text-white/95 text-sm leading-relaxed line-clamp-3">${description}</p>
                <div class="flex items-center gap-2 mt-2">
                    <span class="inline-block w-3 h-3 rounded-full bg-primary"></span>
                    <span class="text-xs text-white/90">${language}</span>
                    <span class="text-xs text-white/70">•</span>
                    <span class="text-xs text-white/70">
                        <i data-lucide="star" class="w-3 h-3 inline mr-1"></i>
                        ${repo.stargazers_count}
                    </span>
                </div>
            </div>
            <div class="flex justify-center">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg hover:scale-110 transform">
                    <i data-lucide="external-link" class="w-5 h-5 text-blue-600"></i>
                </a>
            </div>
        </div>
    `;
    
    return card;
}