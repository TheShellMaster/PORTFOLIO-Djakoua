document.addEventListener("DOMContentLoaded", () => {
    
    // Typewriter effect pour le sous-titre
    const titleEl = document.querySelector('.type-writer');
    if (titleEl) {
        const text = titleEl.innerText;
        titleEl.innerText = '';
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                titleEl.innerHTML += text.charAt(i);
                i++;
                if (i >= text.length) clearInterval(typing);
            }, 50);
        }, 1000); // Attend la fin du fade-up
    }

    // Animation au scroll (Barres de progression circulaires)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation pour les cercles SVG
                if (entry.target.classList.contains('js-prog')) entry.target.style.strokeDashoffset = '28.3'; // 90%
                if (entry.target.classList.contains('react-prog')) entry.target.style.strokeDashoffset = '42.45'; // 85%
                if (entry.target.classList.contains('html-prog')) entry.target.style.strokeDashoffset = '14.15'; // 95%
                if (entry.target.classList.contains('node-prog')) entry.target.style.strokeDashoffset = '56.6'; // 80%
                if (entry.target.classList.contains('py-prog')) entry.target.style.strokeDashoffset = '28.3'; // 90%
                if (entry.target.classList.contains('c-prog')) entry.target.style.strokeDashoffset = '70.75'; // 75%
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.progress').forEach(p => observer.observe(p));

    // Formulaire de contact (Envoi réel d'email via FormSubmit avec AJAX)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche la redirection
            
            const btn = form.querySelector('button');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i> Envoi du mail en cours...';
            btn.style.transform = 'scale(0.95)';
            btn.disabled = true;

            // Récupérer toutes les données du formulaire
            const formData = new FormData(form);

            // Appel AJAX vers FormSubmit
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Email envoyé avec succès !';
                    btn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
                    btn.style.transform = 'scale(1)';
                    
                    const feedback = document.getElementById('form-feedback');
                    feedback.innerHTML = "Votre message a bien été envoyé dans la boîte mail de Brayan ! 🚀<br><small style='color:var(--text-muted);font-size:0.8rem;'>(Si c'est votre 1er test, vérifiez vos emails pour activer formsubmit)</small>";
                    
                    form.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                        feedback.innerHTML = '';
                    }, 6000);
                } else {
                    throw new Error("Erreur serveur");
                }
            })
            .catch(error => {
                btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erreur lors de l\'envoi';
                btn.style.background = '#ef4444';
                btn.disabled = false;
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                }, 3000);
            });
        });
    }

});
