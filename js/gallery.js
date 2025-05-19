document.addEventListener('DOMContentLoaded', () => {
    setupArtworkModal();
});

function setupArtworkModal() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    const modal = document.querySelector('.artwork-modal');
    
    if (!modal) return;
    
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const closeModal = document.querySelector('.close-modal');
    
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const thumbnail = this.querySelector('.artwork-thumbnail img');
            const title = this.querySelector('.artwork-info h3');
            const artist = this.querySelector('.artwork-info .artist');
            
            if (thumbnail && title) {
                modalImage.src = thumbnail.src;
                modalImage.alt = thumbnail.alt;
                modalTitle.textContent = title.textContent;
                
                if (artist) {
                    modalArtist.textContent = artist.textContent;
                }
                
                const artworkId = this.getAttribute('data-id');
                if (artworkId) {
                    customizeModalContent(artworkId);
                }
                
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.opacity = 1;
                }, 10);
                
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', closeArtworkModal);
    }

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeArtworkModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeArtworkModal();
        }
    });
    
    function closeArtworkModal() {
        modal.style.opacity = 0;
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function customizeModalContent(artworkId) {
        const modalTags = modal.querySelector('.modal-tags');
        const modalDescription = modal.querySelector('.modal-description');
        const modalStats = modal.querySelector('.modal-stats');

        let tags = ['#Digital'];
        let description = 'A stunning digital artwork showcasing the artist\'s unique style and vision.';
        let likes = '450';
        let comments = '32';
        let saves = '78';

        if (artworkId === 'artwork-1') {
            tags = ['#Fantasy', '#Digital', '#Landscape'];
            description = 'Digital Dreamscape portrays a surreal landscape where reality and imagination blend. The piece explores themes of consciousness and the boundless nature of creativity.';
            likes = '1.2k';
            comments = '143';
            saves = '256';
        } 
        else if (artworkId === 'artwork-2') {
            tags = ['#Cyberpunk', '#SciFi', '#Urban'];
            description = 'Neon City depicts a futuristic metropolis pulsing with energy and artificial light. This piece captures the essence of cyberpunk aesthetic with its vibrant color palette and intricate architectural details.';
            likes = '945';
            comments = '87';
            saves = '192';
        }
        else if (artworkId === 'artwork-3') {
            tags = ['#Fantasy', '#Character', '#Nature'];
            description = 'Forest Spirit is an ethereal character design combining elements of flora and fauna. The piece represents harmony between sentient beings and nature, with delicate details and atmospheric lighting.';
            likes = '872';
            comments = '76';
            saves = '188';
        }
        else if (artworkId === 'artwork-4') {
            tags = ['#SciFi', '#Space', '#Abstract'];
            description = 'Cosmic Journey takes viewers through the vastness of space with dynamic composition and vibrant nebula formations. This piece explores the theme of exploration and the unknown.';
            likes = '756';
            comments = '68';
            saves = '145';
        }
        else if (artworkId === 'artwork-5') {
            tags = ['#Portrait', '#Digital', '#Character'];
            description = "Digital Portrait showcases advanced digital painting techniques with lifelike rendering and emotional depth. The artist's attention to subtle facial expressions and lighting creates a compelling character study.";
            likes = '689';
            comments = '53';
            saves = '127';
        }

        else if (artworkId.startsWith('fantasy')) {
            tags = ['#Fantasy', '#Digital', '#Illustration'];
            
            if (artworkId === 'fantasy-1') {
                description = 'An enchanted forest scene with magical elements and mystical creatures hidden among the foliage. Created using digital painting techniques with attention to light and atmosphere.';
                likes = '1.5k';
                comments = '124';
                saves = '342';
            }
            else if (artworkId === 'fantasy-2') {
                description = 'A majestic dragon soars above ancient castle ruins, breathing fire against a stormy sky. The piece combines dynamic movement with detailed architectural elements.';
                likes = '1.3k';
                comments = '98';
                saves = '287';
            }
            else if (artworkId === 'fantasy-3') {
                description = 'A magical library where books float through the air and glowing manuscripts reveal ancient secrets. The artwork captures the wonder of knowledge and mystical learning.';
                likes = '1.1k';
                comments = '89';
                saves = '254';
            }
            else if (artworkId === 'fantasy-4') {
                tags = ['#Fantasy', '#Character', '#Digital'];
                description = 'An elven warrior stands at the edge of a crystal lake, illuminated by ethereal moonlight. The detailed armor design and environmental storytelling create a rich fantasy narrative.';
                likes = '967';
                comments = '76';
                saves = '214';
            }
            else if (artworkId === 'fantasy-5') {
                tags = ['#Fantasy', '#Creature', '#Digital'];
                description = 'Mythical creatures gather at a magical oasis, where the water glows with arcane energy. The piece showcases diverse creature design with a cohesive color palette.';
                likes = '892';
                comments = '71';
                saves = '196';
            }
        } 

        else if (artworkId.startsWith('scifi')) {
            tags = ['#SciFi', '#Digital', '#Futuristic'];
            
            if (artworkId === 'scifi-1') {
                description = 'A space station orbiting a distant planet with ships departing for interstellar exploration. The design balances realistic engineering with imaginative futuristic elements.';
                likes = '1.2k';
                comments = '95';
                saves = '267';
            }
            else if (artworkId === 'scifi-2') {
                description = 'A sprawling neon-lit metropolis of the future, showing advanced technology integrated into everyday urban life. The piece explores themes of connectivity and digital immersion.';
                likes = '986';
                comments = '87';
                saves = '213';
            }
            else if (artworkId === 'scifi-3') {
                tags = ['#SciFi', '#Character', '#Digital'];
                description = 'A hyper-realistic android contemplates its existence as it looks into a mirror, blurring the line between human and machine. The artwork raises questions about consciousness and identity.';
                likes = '876';
                comments = '79';
                saves = '184';
            }
            else if (artworkId === 'scifi-4') {
                tags = ['#SciFi', '#Space', '#Digital'];
                description = 'A massive generational starship travels through the void between galaxies. The cutaway view reveals the complex ecosystem and society developing within this self-contained world.';
                likes = '943';
                comments = '82';
                saves = '205';
            }
            else if (artworkId === 'scifi-5') {
                tags = ['#SciFi', '#Mech', '#Digital'];
                description = 'A highly detailed mech suit stands against a backdrop of an alien landscape. The technical precision in the mechanical design showcases the artist\'s understanding of both form and function.';
                likes = '1.1k';
                comments = '93';
                saves = '246';
            }
        }
        else if (artworkId.startsWith('portrait')) {
            tags = ['#Portrait', '#Digital', '#Character'];
            
            if (artworkId === 'portrait-1') {
                description = 'A haunting character portrait with expressionist brushwork that captures raw emotion and psychological depth. The use of color creates a powerful mood.';
                likes = '934';
                comments = '84';
                saves = '197';
            }
            else if (artworkId === 'portrait-2') {
                description = 'A stylized portrait blending realism with abstract elements to create a unique representation of the human form. The piece plays with perception and identity.';
                likes = '862';
                comments = '76';
                saves = '183';
            }
            else if (artworkId === 'portrait-3') {
                tags = ['#Portrait', '#Digital', '#Fantasy'];
                description = 'A fantasy character portrait with elaborate costume design and magical elements. The attention to detail in the facial features and expressions brings this imaginary character to life.';
                likes = '915';
                comments = '79';
                saves = '201';
            }
            else if (artworkId === 'portrait-4') {
                tags = ['#Portrait', '#Digital', '#SciFi'];
                description = 'A futuristic character with cybernetic enhancements and a striking gaze. The portrait explores the relationship between humanity and technology through careful detail work.';
                likes = '824';
                comments = '67';
                saves = '175';
            }
            else if (artworkId === 'portrait-5') {
                tags = ['#Portrait', '#Digital', '#Stylized'];
                description = 'A stylized portrait using bold shapes and limited color palette to create a striking visual impact. The minimalist approach demonstrates that powerful portraiture doesn\'t require photorealism.';
                likes = '793';
                comments = '65';
                saves = '158';
            }
        }
        
        if (modalTags) {
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const tagName = tag.substring(1);
                const tagElement = document.createElement('a');
                tagElement.className = 'tag';
                tagElement.href = `gallery.html#${tagName.toLowerCase()}`;
                tagElement.textContent = tag;
                modalTags.appendChild(tagElement);
            });
        }
        
        if (modalDescription) {
            modalDescription.textContent = description;
        }
        
        if (modalStats) {
            const statsSpans = modalStats.querySelectorAll('span');
            if (statsSpans.length >= 3) {
                statsSpans[0].innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                statsSpans[1].innerHTML = `<i class="fas fa-comment"></i> ${comments}`;
                statsSpans[2].innerHTML = `<i class="fas fa-bookmark"></i> ${saves}`;
            }
        }
    }
}