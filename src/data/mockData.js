export const mockTickets = [
    {
        id: 1,
        subject: "Issue with login",
        description: "I can't log into my account.",
        status: "Open",
        customer: "John Doe",
        replies: [
            {
                role: "customer",
                message: "I can't log into my account, please help.",
                time: "2025-01-01 10:00:00",
            },
        ],
    },
    {
        id: 2,
        subject: "Payment failure",
        description: "I can't process payments.",
        status: "Resolved",
        customer: "Jane Smith",
        replies: [
            {
                role: "customer",
                message: "My payment keeps failing, help!",
                time: "2025-01-02 12:00:00",
            },
            {
                role: "admin",
                message: "We've resolved the issue, please try again.",
                time: "2025-01-02 15:00:00",
            },
        ],
    },
]
