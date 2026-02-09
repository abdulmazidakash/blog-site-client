export const dynamic = "force-dynamic";
export default async function AboutPage() {

  // Simulate a delay
  await new Promise((resolve)=> setTimeout(resolve, 4000))

  // Simulate an error
  // throw new Error('Failed to load AboutPage');

  return (
    <div>AboutPage</div>
  )
}
