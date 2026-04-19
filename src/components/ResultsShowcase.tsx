import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BeforeAfter } from "@/components/BeforeAfter";

// Cervical
import cervicalS1Orig from "@/assets/results/cervical-s1-original.jpg";
import cervicalS1Turbo from "@/assets/results/cervical-s1-turbo.jpg";
import cervicalS2Orig from "@/assets/results/cervical-s2-original.jpg";
import cervicalS2Turbo from "@/assets/results/cervical-s2-turbo.jpg";
import cervicalS3Orig from "@/assets/results/cervical-s3-original.jpg";
import cervicalS3Turbo from "@/assets/results/cervical-s3-turbo.jpg";
import cervicalS4Orig from "@/assets/results/cervical-s4-original.jpg";
import cervicalS4Turbo from "@/assets/results/cervical-s4-turbo.jpg";
// Lombar
import lombarS1Orig from "@/assets/results/lombar-s1-original.jpg";
import lombarS1Turbo from "@/assets/results/lombar-s1-turbo.jpg";
import lombarS2Orig from "@/assets/results/lombar-s2-original.jpg";
import lombarS2Turbo from "@/assets/results/lombar-s2-turbo.jpg";
import lombarS3Orig from "@/assets/results/lombar-s3-original.jpg";
import lombarS3Turbo from "@/assets/results/lombar-s3-turbo.jpg";
import lombarS4Orig from "@/assets/results/lombar-s4-original.jpg";
import lombarS4Turbo from "@/assets/results/lombar-s4-turbo.jpg";
// Joelho
import joelhoS1Orig from "@/assets/results/joelho-s1-original.jpg";
import joelhoS1Turbo from "@/assets/results/joelho-s1-turbo.jpg";
import joelhoS2Orig from "@/assets/results/joelho-s2-original.jpg";
import joelhoS2Turbo from "@/assets/results/joelho-s2-turbo.jpg";
import joelhoS3Orig from "@/assets/results/joelho-s3-original.jpg";
import joelhoS3Turbo from "@/assets/results/joelho-s3-turbo.jpg";
import joelhoS4Orig from "@/assets/results/joelho-s4-original.jpg";
import joelhoS4Turbo from "@/assets/results/joelho-s4-turbo.jpg";
// Ombro
import ombroS1Orig from "@/assets/results/ombro-s1-original.jpg";
import ombroS1Turbo from "@/assets/results/ombro-s1-turbo.jpg";
import ombroS2Orig from "@/assets/results/ombro-s2-original.jpg";
import ombroS2Turbo from "@/assets/results/ombro-s2-turbo.jpg";
import ombroS3Orig from "@/assets/results/ombro-s3-original.jpg";
import ombroS3Turbo from "@/assets/results/ombro-s3-turbo.jpg";
import ombroS4Orig from "@/assets/results/ombro-s4-original.jpg";
import ombroS4Turbo from "@/assets/results/ombro-s4-turbo.jpg";
// Punho
import punhoS1Orig from "@/assets/results/punho-s1-original.jpg";
import punhoS1Turbo from "@/assets/results/punho-s1-turbo.jpg";
import punhoS2Orig from "@/assets/results/punho-s2-original.jpg";
import punhoS2Turbo from "@/assets/results/punho-s2-turbo.jpg";
import punhoS3Orig from "@/assets/results/punho-s3-original.jpg";
import punhoS3Turbo from "@/assets/results/punho-s3-turbo.jpg";
import punhoS4Orig from "@/assets/results/punho-s4-original.jpg";
import punhoS4Turbo from "@/assets/results/punho-s4-turbo.jpg";

interface SeriesPair {
  label: string;
  original: string;
  turbo: string;
}

interface ExamCase {
  id: string;
  name: string;
  standardTime: string;
  turboTime: string;
  reduction: number;
  series: SeriesPair[];
}

const exams: ExamCase[] = [
  {
    id: "cervical",
    name: "Cervical",
    standardTime: "11:22",
    turboTime: "05:18",
    reduction: 53,
    series: [
      { label: "Sagital T2", original: cervicalS1Orig, turbo: cervicalS1Turbo },
      { label: "Sagital T1", original: cervicalS2Orig, turbo: cervicalS2Turbo },
      { label: "Sagital STIR", original: cervicalS3Orig, turbo: cervicalS3Turbo },
      { label: "Axial T2", original: cervicalS4Orig, turbo: cervicalS4Turbo },
    ],
  },
  {
    id: "lombar",
    name: "Lombar",
    standardTime: "10:19",
    turboTime: "04:59",
    reduction: 52,
    series: [
      { label: "Sagital T2", original: lombarS1Orig, turbo: lombarS1Turbo },
      { label: "Sagital T1", original: lombarS2Orig, turbo: lombarS2Turbo },
      { label: "Sagital STIR", original: lombarS3Orig, turbo: lombarS3Turbo },
      { label: "Axial T2", original: lombarS4Orig, turbo: lombarS4Turbo },
    ],
  },
  {
    id: "joelho",
    name: "Joelho",
    standardTime: "09:56",
    turboTime: "05:47",
    reduction: 42,
    series: [
      { label: "Sagital FS", original: joelhoS1Orig, turbo: joelhoS1Turbo },
      { label: "Sagital DP", original: joelhoS2Orig, turbo: joelhoS2Turbo },
      { label: "Axial DP Dixon", original: joelhoS3Orig, turbo: joelhoS3Turbo },
      { label: "Coronal T1", original: joelhoS4Orig, turbo: joelhoS4Turbo },
    ],
  },
  {
    id: "ombro",
    name: "Ombro",
    standardTime: "10:21",
    turboTime: "06:44",
    reduction: 35,
    series: [
      { label: "Axial DP FS", original: ombroS1Orig, turbo: ombroS1Turbo },
      { label: "Coronal DP FS", original: ombroS2Orig, turbo: ombroS2Turbo },
      { label: "Coronal T1", original: ombroS3Orig, turbo: ombroS3Turbo },
      { label: "Sagital T1", original: ombroS4Orig, turbo: ombroS4Turbo },
    ],
  },
  {
    id: "punho",
    name: "Punho",
    standardTime: "20:11",
    turboTime: "08:36",
    reduction: 57,
    series: [
      { label: "Coronal DP FS", original: punhoS1Orig, turbo: punhoS1Turbo },
      { label: "Coronal T1", original: punhoS2Orig, turbo: punhoS2Turbo },
      { label: "Sagital DP FS", original: punhoS3Orig, turbo: punhoS3Turbo },
      { label: "Axial T1", original: punhoS4Orig, turbo: punhoS4Turbo },
    ],
  },
];

export const ResultsShowcase = () => {
  return (
    <Tabs defaultValue="cervical" className="w-full">
      <TabsList className="w-full h-auto flex-wrap justify-center bg-muted/60 p-1.5 rounded-xl mb-8">
        {exams.map((exam) => (
          <TabsTrigger
            key={exam.id}
            value={exam.id}
            className="flex-1 min-w-[110px] data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:border-0 font-semibold text-sm"
          >
            {exam.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {exams.map((exam) => (
        <TabsContent key={exam.id} value={exam.id} className="mt-0 animate-fade-in">
          <Card className="p-5 sm:p-6 mb-6 border-border/50 shadow-card">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Região</p>
                <p className="text-lg sm:text-xl font-bold">{exam.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Padrão</p>
                <p className="text-lg sm:text-xl font-bold tabular-nums">{exam.standardTime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">⚡ TurboMR</p>
                <p className="text-lg sm:text-xl font-bold gradient-text tabular-nums">{exam.turboTime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-success font-semibold mb-1">Redução</p>
                <p className="text-lg sm:text-xl font-bold text-success tabular-nums">-{exam.reduction}%</p>
              </div>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {exam.series.map((s) => (
              <Card key={s.label} className="overflow-hidden border-border/50 shadow-card hover-lift">
                <div className="px-4 py-3 bg-muted/60 border-b border-border">
                  <h4 className="font-bold text-sm sm:text-base">{s.label}</h4>
                </div>
                <div className="p-3 sm:p-4 bg-card">
                  <BeforeAfter
                    beforeSrc={s.original}
                    afterSrc={s.turbo}
                    beforeLabel="Rotina"
                    afterLabel="TurboMR"
                    alt={`${exam.name} ${s.label} - comparativo Rotina vs TurboMR`}
                    imageFit="contain"
                    className="aspect-[4/3] sm:aspect-square"
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
