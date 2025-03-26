document.addEventListener("DOMContentLoaded", function() {
    // Toggle API descriptions
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const description = document.getElementById(targetId);
            
            // Close all other descriptions first
            document.querySelectorAll('.api-description').forEach(desc => {
                if (desc.id !== targetId && desc.classList.contains('active')) {
                    desc.classList.remove('active');
                    const relatedBtn = document.querySelector(`[data-target="${desc.id}"]`);
                    relatedBtn.querySelector('i').classList.remove('fa-chevron-up');
                    relatedBtn.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Toggle the clicked description
            description.classList.toggle('active');
            const icon = this.querySelector('i');
            if (description.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Copy URL functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const endpoint = this.getAttribute('data-endpoint');
            const fullUrl = window.location.origin + endpoint;
            
            navigator.clipboard.writeText(fullUrl)
                .then(() => showToast('URL copied to clipboard!'))
                .catch(err => showToast('Failed to copy URL'));
        });
    });

    // Search functionality
    const searchInput = document.getElementById('apiSearch');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const apiItems = document.querySelectorAll('.api-item');
        let foundResults = false;
        
        apiItems.forEach(item => {
            const title = item.querySelector('.api-title').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                foundResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide "no results" message
        const noResults = document.getElementById('noResults');
        if (foundResults) {
            noResults.classList.add('hidden');
        } else {
            noResults.classList.remove('hidden');
        }
        
        // Update category visibility based on visible items
        document.querySelectorAll('.api-category').forEach(category => {
            const categoryItems = category.querySelectorAll('.api-item');
            let visibleCount = 0;
            
            categoryItems.forEach(item => {
                if (item.style.display !== 'none') {
                    visibleCount++;
                }
            });
            
            if (visibleCount === 0) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
                // Update the count display
                const countElement = category.querySelector('.category-count');
                countElement.textContent = `${visibleCount} API${visibleCount !== 1 ? 's' : ''}`;
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const bodyElement = document.body;
    
    // Check user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (bodyElement.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Toast notification system
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.querySelector('.toast-message').textContent = message;
        
        toast.classList.add('show');
        
        // Reset the progress animation
        const progress = toast.querySelector('.toast-progress');
        progress.style.animation = 'none';
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = null;
        
        // Hide toast after animation completes
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Add animation to stats on page load
    setTimeout(() => {
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 150 * index);
        });
    }, 300);
});