import { useLanguage } from "@/shared/context/LanguageContext.jsx"
import { LiquidGlassButton } from "@/shared/components"
import { Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { colors } from "@/shared/utils/colors"
import { AIImages, AIBubble } from "@/shared/assets/images/home"

const AISection = () => {
  const { t } = useLanguage()

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-24 flex items-center">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 lg:items-center">
        {/* Left Side - 3 Image Layout */}
        {/* Left Side - Image Composition */}
        <div className="relative order-1 w-full max-w-[500px] lg:max-w-[600px] mx-auto">
          {/* Main Image */}
          <img
            src={AIImages}
            alt="AI Features"
            className="w-full h-auto object-contain"
          />

          {/* Bubble Group - Top Right */}
          <div className="absolute top-0 right-0 w-40 sm:w-52 md:w-64 z-10">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={AIBubble}
                alt="Greeting Bubble"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
              {/* Centered Text in Bubble */}
              <Typography
                variant="h6"
                className="absolute inset-0 flex items-center justify-center font-bold text-white text-center p-4 leading-tight"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {t.home.aiSection.greeting}
              </Typography>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        {/* Right Side - Content */}
        <div className="order-2 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6">
          {/* Header */}
          <div className="relative inline-block pb-2">
            <Typography
              variant="caption"
              className="uppercase tracking-wider text-gray-500 font-bold block"
            >
              {t.home.aiSection.header}
            </Typography>
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-cath-red-800"
              style={{ width: "20%" }}
            />
          </div>

          {/* Main Heading */}
          <Typography
            variant="h4"
            component="h2"
            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
              },
              fontWeight: "bold",
            }}
          >
            {t.home.aiSection.mainHeading}
          </Typography>

          {/* Description */}
          {/* <Typography
            variant="body1"
            className="text-base md:text-lg text-gray-600 leading-relaxed"
          >
            {t.home.aiSection.description}
          </Typography> */}

          {/* Features List */}
          <ul className="space-y-3 sm:space-y-4">
            {t.home.aiSection.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckIcon sx={{ color: colors.red[800], fontSize: 20 }} />
                </div>
                <Typography
                  variant="body1"
                  component="span"
                  className="text-lg md:text-xl text-gray-700 flex-1"
                >
                  {feature}
                </Typography>
              </li>
            ))}
          </ul>

          {/* Call to Action Button */}
          {/* <div className="pt-4">
            <LiquidGlassButton
              variant="yellow"
              className="rounded-[999px] px-8 py-4 text-base font-semibold text-white"
            >
              {t.home.aiSection.learnMore}
            </LiquidGlassButton>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AISection
