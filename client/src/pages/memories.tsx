import { Card, CardContent } from "@/components/ui/card";

export default function Memories() {
  const memories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Pertama Kali Bertemu",
      description: "Hari itu rasanya waktu berhenti saat mata kita bertemu. Senyummu yang manis langsung mencuri hatiku..."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Kencan Pertama",
      description: "Gugup tapi bahagia, itulah yang kurasakan. Kamu membuatku merasa seperti orang paling beruntung di dunia..."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Tawa Bersama",
      description: "Setiap tawa yang kita bagi membuat hariku semakin cerah. Kamu adalah alasan tersenyumku setiap hari..."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Malam Berbintang",
      description: "Di bawah langit malam yang penuh bintang, aku berjanji akan selalu menjagamu dan mencintaimu..."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Jalan Berdua",
      description: "Setiap langkah yang kita ambil bersama adalah petualangan baru yang selalu kutunggu-tunggu..."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Masa Depan Kita",
      description: "Aku yakin masa depan kita akan dipenuhi dengan kebahagiaan, cinta, dan kenangan indah lainnya..."
    }
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="romantic-font text-5xl md:text-6xl font-bold gradient-text mb-4">
            Kenangan Indah Kita
          </h1>
          <p className="text-xl text-muted-foreground">
            Setiap momen bersamamu adalah berkah yang tak ternilai 💕
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory) => (
            <Card key={memory.id} className="memory-card rounded-2xl card-hover" data-testid={`memory-card-${memory.id}`}>
              <CardContent className="p-6">
                <img 
                  src={memory.image} 
                  alt={memory.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  data-testid={`memory-image-${memory.id}`}
                />
                <h3 className="romantic-font text-2xl font-semibold text-primary mb-2" data-testid={`memory-title-${memory.id}`}>
                  {memory.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`memory-description-${memory.id}`}>
                  {memory.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
