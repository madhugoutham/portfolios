import ExperienceDetailClient from "./ExperienceDetailClient";

export async function generateStaticParams() {
    return [
        { slug: "keybank" },
        { slug: "niu" },
        { slug: "tcs-experian" },
        { slug: "stanley" },
    ];
}

export default async function ExperienceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ExperienceDetailClient slug={slug} />;
}
