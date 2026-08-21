  export const services = [
    { name: "api.betterstack.io", status: "200", ms: 84 },
    { name: "checkout-eu", status: "200", ms: 112 },
    { name: "auth-worker", status: "200", ms: 41 },
    { name: "webhook-relay", status: "200", ms: 96 },
  ];

  export const features = [
    {
      title: "HTTP & ping checks",
      desc: "Poll any endpoint every 30 seconds from multiple regions and get alerted the moment it fails.",
    },
    {
      title: "Status pages",
      desc: "A public page that updates itself the instant an incident opens or resolves.",
    },
    {
      title: "On-call escalation",
      desc: "Route alerts to the right person by phone, SMS, Slack, or push — with automatic escalation if they miss it.",
    },
    {
      title: "Incident timelines",
      desc: "Every check, every alert, every ack — logged automatically so postmortems write themselves.",
    },
  ];

  export const stats = [
    { value: "30s", label: "check interval" },
    { value: "11", label: "monitoring regions" },
    { value: "<60s", label: "avg. alert time" },
    { value: "99.99%", label: "of our own uptime" },
  ];