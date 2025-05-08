# melisaonder.com Website

This is the Next.js and Tailwind CSS website for Melisa Onder.

## Development

1.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

This project is configured for auto-deployment on Git push to Vercel.

### Domain Setup:

1.  **Add Domain to Vercel Project:**
    After creating your project on Vercel, add the custom domain:
    ```bash
    vercel domains add melisaonder.com
    ```
    (Replace `melisaonder.com` with your actual domain if different, and ensure you are logged into the Vercel CLI and in the correct project directory).

2.  **Update DNS Records at GoDaddy (or your registrar):**
    Follow the instructions provided in your Vercel project's domain settings. This typically involves:
    *   Adding an `A` record pointing to Vercel's IP address.
    *   Adding a `CNAME` record for `www` pointing to `cname.vercel-dns.com`.
    Vercel will provide the exact values needed.

## Creative Feature Flags Notes

The project includes conceptual creative feature flags. Implementation details for these would vary:

*   `confettiOnYes: true` - Can be a state variable triggering a confetti library.
*   `cursorTrail: "hearts"` - Could be implemented with a JavaScript library that renders a trail following the cursor.
*   `responsiveBreakpoints: ["sm","md","lg"]` - Configured in `tailwind.config.js`.
*   `darkModeToggle: true` (with fun cat icon) - Implemented in the main layout using Tailwind's dark mode class and a state variable.
*   `geolocationSwap: { city: "Toronto", overrideImage: string }` - Would require client-side geolocation API and conditional rendering.
*   `countdownTimer: { targetDate: string }` - Can be a React component calculating time remaining.
*   `guestbook: { enabled: true, storage: "serverless" }` - Would require a database and serverless functions for CRUD operations.
*   `lottieAnimations: [{ name: "firstMeet", src: string }]` - Can use a Lottie player library for React.

## Placeholder Content

Throughout the components, look for comments like `// TODO: replace with real content` to identify where actual images, text, and other assets from Jack are needed.
Prop definitions are included at the top of each component file for clarity. 