
const pricingList: any[] = [
  {
    name: "Hobby",
    price: 0,
    features: [
      "All editor features",
      "Monthly connections 1k",
      "Workspace 1",
      "Webhook",
      "Region",
      "Document history"
    ]
  },
  {
    name: "Pro",
    price: 9.99,
    features: [
      "All editor features",
      "Monthly connections 5k",
      "Workspace 10",
      "Webhook",
      "Region",
      "Document history"
    ]
  },
  {
    name: "Enterprise",
    price: 99.99,
    features: [
      "All editor features",
      "Monthly connections 99k",
      "Workspace 99",
      "Webhook",
      "Region",
      "Document history"
    ]
  },
]

function pricingLabel(pricing: number) {
  if (pricing === 0) {
    return <>Free</>
  } else {
    return <>
      <span>${pricing}</span>
      <span className="text-lg text-gray-500 font-normal ml-2">/&nbsp;month</span>
    </>
  }
}

export default function Pricing() {
  return (
    <div className={"pricing container"}>
      <h2 className={"text-4xl font-bold text-center my-20"}>Pricing</h2>
      <div className={"grid lg:grid-cols-3 sm:grid-cols-1 gap-10 lg:px-20"}>
        {pricingList.map((pricing: any, index: number) => (
          <div
            key={index}
            className={"p-10 shadow rounded border border-gray-100 flex flex-col gap-8"}
          >
            <h3 className={"text-3xl font-bold text-center"}>{pricing.name}</h3>
            <h3 className={"text-4xl font-bold text-center"}>{pricingLabel(pricing.price)}</h3>
            <ul>
              {pricing.features.map((feature: string, index: number) => (
                <li key={index} className={"leading-8"}>{feature}</li>
              ))}
            </ul>
            <div className={"flex flex-1 justify-center py-5"}>
              <button className={"rounded-xl border border-gray-200 px-10 py-2 text-gray-600"}>Subscribe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}