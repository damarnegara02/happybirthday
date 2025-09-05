import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Letter() {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const openLetter = () => {
    setIsOpened(true);
    setTimeout(() => {
      setShowMessage(true);
      createFloatingHearts();
    }, 500);
  };

  const createFloatingHearts = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'float 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 200);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="romantic-font text-5xl md:text-6xl font-bold gradient-text mb-8">
          Surat Cinta Untukmu
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Klik amplop di bawah untuk membaca surat spesial dariku 💌
        </p>

        {/* Envelope Animation */}
        <div 
          className={`envelope mx-auto w-80 h-60 relative mb-8 cursor-pointer transition-transform duration-300 hover:scale-105 ${isOpened ? 'opened' : ''}`}
          onClick={openLetter}
          data-testid="envelope"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center relative">
            <div className="envelope-flap absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-accent to-primary rounded-t-lg border-b-2 border-primary-foreground/20 flex items-end justify-center pb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-primary-foreground text-center">
              <Mail className="w-16 h-16 mx-auto mb-2" />
              <p className="romantic-font text-xl">Untuk: Kamu ❤️</p>
            </div>
          </div>
        </div>

        {/* Love Message */}
        {showMessage && (
          <div className="animate-fadeIn" data-testid="love-message">
            <Card className="memory-card rounded-2xl mb-8">
              <CardContent className="p-8 text-left">
                <div className="text-center mb-6">
                  <p className="romantic-font text-3xl text-primary">Surat Cinta</p>
                  <p className="text-muted-foreground">Dari: Seseorang yang sangat mencintaimu</p>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Sayang,</p>
                  
                  <p>Aku tidak tahu bagaimana cara mengekspresikan perasaan yang begitu besar ini dengan kata-kata. Tapi aku akan mencoba...</p>
                  
                  <p>Kamu adalah orang yang mengubah hidupku menjadi lebih bermakna. Sebelum bertemu denganmu, aku merasa seperti puzzle yang tidak lengkap. Tapi sekarang, kamu adalah potongan terakhir yang membuat semuanya sempurna.</p>
                  
                  <p>Setiap saat bersamamu adalah momen yang ingin kubekukan waktu. Tawamu adalah musik terindah yang pernah kudengar. Senyummu adalah matahari yang menerangi hari-hariku.</p>
                  
                  <p>Aku berjanji akan selalu ada untukmu, dalam keadaan apapun. Ketika kamu sedih, aku akan menjadi bahumu untuk menangis. Ketika kamu bahagia, aku akan menjadi teman terbaikmu untuk merayakannya.</p>
                  
                  <p>Terima kasih sudah menjadi bagian terpenting dalam hidupku. Terima kasih sudah mengajarkanku arti cinta yang sesungguhnya.</p>
                  
                  <p className="text-center romantic-font text-2xl text-primary mt-8">
                    Aku mencintaimu lebih dari yang bisa kata-kata ungkapkan ❤️
                  </p>
                  
                  <div className="text-right mt-6">
                    <p className="romantic-font text-xl text-primary">Dengan cinta,</p>
                    <p className="romantic-font text-2xl text-primary">Pacarmu yang bucin ❤️</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Link href="/">
                <Button className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 card-hover" data-testid="button-home">
                  <Heart className="w-5 h-5 mr-2" />
                  Kembali ke Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
