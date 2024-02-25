
  /**
   * Sidebar toggle
   */
  function toggleSidebar() {
    // Check if element with class 'toggle-sidebar-btn' exists
    var toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
    
    // If the element exists, add click event listener
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener('click', function(e) {
        // Toggle the 'toggle-sidebar' class on the body element
        document.body.classList.toggle('toggle-sidebar');
      });
    }
  }
  
  // Call the function to activate the sidebar toggle functionality
  toggleSidebar();
  
  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

