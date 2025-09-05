import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart, Star, Infinity } from "lucide-react";

export default function Gallery() {
  const quotes = [
    {
      id: 1,
      icon: Quote,
      text: "Kamu adalah alasan aku percaya pada cinta sejati",
      description: "Sebelum bertemu denganmu, aku tidak pernah mengerti apa itu cinta yang sesungguhnya. Kamu mengajarkanku bahwa cinta itu bukan hanya perasaan, tapi komitmen untuk selalu bersama dalam suka dan duka.",
      color: "text-primary"
    },
    {
      id: 2,
      icon: Heart,
      text: "Setiap hari bersamamu adalah hadiah terindah",
      description: "Bangun tidur dan melihat pesanmu adalah hal pertama yang membuatku tersenyum. Menjalani hari bersamamu, meski hanya lewat chat atau video call, sudah cukup membuat hariku sempurna.",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: Star,
      text: "Kamu adalah bintang paling terang di hidupku",
      description: "Saat dunia terasa gelap dan penuh masalah, kehadiranmu seperti bintang yang memberikan cahaya dan harapan. Kamu selalu tahu cara membuatku merasa lebih baik.",
      color: "text-accent"
    },
    {
      id: 4,
      icon: Infinity,
      text: "Cintaku padamu tak akan pernah berujung",
      description: "Seperti matahari yang selalu terbit setiap pagi, seperti itulah cintaku padamu. Konstan, hangat, dan tidak akan pernah berhenti menerangi hidupmu dengan kebahagiaan.",
      color: "text-primary"
    }
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="romantic-font text-5xl md:text-6xl font-bold gradient-text mb-4">
            Kata-kata Untukmu
          </h1>
          <p className="text-xl text-muted-foreground">
            Kumpulan ungkapan cinta dari lubuk hatiku yang terdalam 💝
          </p>
        </div>

        <div className="space-y-8">
          {quotes.map((quote) => {
            const Icon = quote.icon;
            return (
              <Card key={quote.id} className="memory-card rounded-2xl card-hover" data-testid={`quote-card-${quote.id}`}>
                <CardContent className="p-8 text-center">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${quote.color}`} data-testid={`quote-icon-${quote.id}`} />
                  <p className={`romantic-font text-2xl md:text-3xl mb-4 ${quote.color}`} data-testid={`quote-text-${quote.id}`}>
                    "{quote.text}"
                  </p>
                  <p className="text-muted-foreground" data-testid={`quote-description-${quote.id}`}>
                    {quote.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
