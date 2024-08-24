document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const departmentId = params.get('id');
    const url = 'https://api-colombia.com/api/v1/department/${departmentId}';

