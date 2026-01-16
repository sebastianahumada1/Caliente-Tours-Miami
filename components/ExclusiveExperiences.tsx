import ExperienceCard from './ExperienceCard';

const experiences = [
  {
    title: 'Sandbar Soirée',
    subtitle: 'Day Party',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuEclvVnvKZGz-QjuI4C22JAPFtd7Z1NXH0_eOVGKcSG4iiexXWyRMRFqIB7aB9GYaTL7kBWspQd9COILmZ6cmEUWRhnDPuGoEkTNe0CCS8H_l2EbmS-ODFR14bLLdnr8QlfkcOIO84BqmPOnrPCU_rT25XGnB-UzBD1_LOzaMAWET5lx3GxU3fhv1m_Rayunus8bSNLJx_GvIhHBBGDTeII2un1RH2eqyALUS127bDs_WNlu04wwjVVtGSN5E2X6e3qkRsjIDyg',
    borderColor: 'primary' as const,
  },
  {
    title: 'Skyline Dinner',
    subtitle: 'Golden Hour',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_qm1Chqi3b48qQvy1bnEHlpztVTtXq7LkgIVgiVPh70DkKvvhW3YvAv_JTG_0D9EDNdra-3QG4eZzzk9Rnengh-rGlz1GTvbmU74EycluMMt3dn3_28otsRaI1AQBXPiTqJ5xpEkLMdjd4AjHdf3uDPOXdkW4JUruSvgTXgRUWUamIy-E4wKD5haBheYFd10pb0l2jGL0IsBsrpwVlSoClw8vcT1ddKVlTJBidMcQHygv7mtTgdYT6OxjK9jmZs6cODAeDiQOw',
    borderColor: 'secondary' as const,
  },
];

export default function ExclusiveExperiences() {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold italic uppercase tracking-tighter px-2 mb-6">
        Exclusive Experiences
      </h3>
      <div className="grid grid-cols-2 gap-4 px-2">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            title={experience.title}
            subtitle={experience.subtitle}
            image={experience.image}
            borderColor={experience.borderColor}
          />
        ))}
      </div>
    </section>
  );
}
