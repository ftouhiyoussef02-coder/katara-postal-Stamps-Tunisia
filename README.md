import { useState, useEffect, useRef } from "react";
import { Hand } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [lang, setLang] = useState(null);
  const [video, setVideo] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("Click to explore");
  const [playerReady, setPlayerReady] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef(null);
  const lastInteraction = useRef(Date.now());

  // ==================== SOUS-TITRES YA RAYA RAYA ====================
  const yarayaSubtitlesEn = [
    { start: 0, end: 2, text: "We want" },
    { start: 2, end: 5, text: "To hear a song" },
    { start: 5, end: 8, text: "From Hassiba Rochdi" },
    { start: 8, end: 11, text: "This song is called 'Raya Raya'" },
    { start: 11, end: 13, text: "Today, many people don't know the meaning of the word 'Raya'" },
    { start: 13, end: 15, text: "The masculine singular: Ray" },
    { start: 15, end: 18, text: "And the feminine: Raya" },
    { start: 18, end: 20, text: "Raya is the feminine form of Ray" },
    { start: 20, end: 23, text: "And 'Raya Raya' in this song" },
    { start: 23, end: 25, text: "According to our research" },
    { start: 25, end: 29, text: "Is a lament" },
    { start: 29, end: 31, text: "Through which the oppressed Tunisian is presented" },
    { start: 31, end: 34, text: "Who fought under oppression" },
    { start: 34, end: 38, text: "And was sent to fight in France and outside France" },
    { start: 38, end: 42, text: "To participate in battles, not for the defense of his homeland" },
    { start: 42, end: 45, text: "So some women did not want their sons to go to war" },
    { start: 45, end: 47, text: "Because these wars did not belong to them" },
    { start: 47, end: 50, text: "So they complain to Raya" },
    { start: 50, end: 53, text: "Raya which is France" },
    { start: 53, end: 55, text: "And they say: go complain to the moon" },
    { start: 55, end: 57, text: "The moon (gamra) is a word that is said" },
    { start: 57, end: 60, text: "But its meaning is not clear" },
    { start: 60, end: 66, text: "There is no moon (gamra) that controls the world" },
    { start: 66, end: 70, text: "So perhaps it comes from the Italian word 'camera' which means room" },
    { start: 70, end: 72, text: "And that is why: 'Complain to the moon' means 'complain to the French council (majlis)'" },
    { start: 72, end: 75, text: "In this song, it's a woman" },
    { start: 75, end: 78, text: "Who believes that her son sent her a letter from the war" },
    { start: 78, end: 82, text: "And the man who fought in this war was struck" },
    { start: 82, end: 87, text: "And he tells his mother how he was struck in the war" },
    { start: 87, end: 90, text: "No need for me to tell the story, Hassiba Rochdi will do it" },
    { start: 90, end: 120, text: "♫ Repetitive background music and singing ♫" },
    { start: 120, end: 122, text: "Ya raya raya" },
    { start: 122, end: 127, text: "Oh my mother, ya raya raya" },
    { start: 127, end: 137, text: "Ya raya raya, my uncle didn't come, and they didn't ask my opinion, oh my mother" },
    { start: 137, end: 168, text: "♫ Repetitive background music and singing ♫" },
    { start: 168, end: 171, text: "Oh my mother, they struck me" },
    { start: 171, end: 176, text: "And the strike came upon my chest" },
    { start: 176, end: 181, text: "♫ Repetitive background music and singing ♫" },
    { start: 181, end: 189, text: "Oh my mother, they strike me and I endure" },
    { start: 189, end: 204, text: "♫ Repetitive background music and singing ♫" },
    { start: 204, end: 210, text: "Ya raya raya, oh my mother, ya raya raya" },
    { start: 210, end: 215, text: "Ya raya raya, no one came to my rescue" },
    { start: 215, end: 217, text: "And no one asked my opinion" },
    { start: 217, end: 221, text: "Oh my mother" },
    { start: 221, end: 229, text: "👏 Applause 👏" }
  ];

  const yarayaSubtitlesAr = [
    { start: 0, end: 2, text: "نحن نريد" },
    { start: 2, end: 5, text: "أن نسمع أغنية" },
    { start: 5, end: 8, text: "من حسيبة رشدي" },
    { start: 8, end: 11, text: "هذه الأغنية اسمها 'رايا رايا'" },
    { start: 11, end: 13, text: "اليوم، كثير من الناس لا يعرفون معنى كلمة 'رايا'" },
    { start: 13, end: 15, text: "المفرد المذكر: راي" },
    { start: 15, end: 18, text: "والمؤنث: رايا" },
    { start: 18, end: 20, text: "رايا هي المؤنث من راي" },
    { start: 20, end: 23, text: "و'رايا رايا' في هذه الأغنية" },
    { start: 23, end: 25, text: "وفقاً لأبحاثنا" },
    { start: 25, end: 29, text: "هي شكوى" },
    { start: 29, end: 31, text: "التي يُعرض من خلالها التونسي المظلوم" },
    { start: 31, end: 34, text: "الذي كان يقاتل تحت الاضطهاد" },
    { start: 34, end: 38, text: "وكان يُرسل للقتال في فرنسا وخارج فرنسا" },
    { start: 38, end: 42, text: "للمشاركة في معارك، لا للدفاع عن وطنه" },
    { start: 42, end: 45, text: "فبعض النساء لم يرغبن في ذهاب أبنائهن للحرب" },
    { start: 45, end: 47, text: "لأن هذه الحروب ليست ملكاً لهن" },
    { start: 47, end: 50, text: "فيشتكين إلى رايا" },
    { start: 50, end: 53, text: "رايا التي هي فرنسا" },
    { start: 53, end: 55, text: "ويقلن: اشتكي إلى القمر" },
    { start: 55, end: 57, text: "القمر (قمرة) كلمة تُقال" },
    { start: 57, end: 60, text: "لكن معناها غير واضح" },
    { start: 60, end: 66, text: "ليس هناك قمر (قمرة) يتحكم في العالم" },
    { start: 66, end: 70, text: "فربما تأتي من الكلمة الإيطالية 'camera' التي تعني غرفة" },
    { start: 70, end: 72, text: "ولهذا: 'اشتكي إلى القمر' تعني 'اشتكي إلى المجلس الفرنسي'" },
    { start: 72, end: 75, text: "في هذه الأغنية، إنها امرأة" },
    { start: 75, end: 78, text: "تعتقد أن ابنها أرسل لها رسالة بريدية من الحرب" },
    { start: 78, end: 82, text: "والرجل الذي قاتل في هذه الحرب ضُرب" },
    { start: 82, end: 87, text: "ويحكي لأمه كيف ضُرب في الحرب" },
    { start: 87, end: 90, text: "لا داعي لأن أروي لكم القصة، حسيبة رشدي ستفعلها" },
    { start: 90, end: 120, text: "♫ موسيقى وغناء خلفي متكرر ♫" },
    { start: 120, end: 122, text: "يا رايا رايا" },
    { start: 122, end: 127, text: "يا أمي، يا رايا رايا" },
    { start: 127, end: 137, text: "يا رايا رايا، خالي ما جاءش، وما سألونيش على رأيي، يا أمي" },
    { start: 137, end: 168, text: "♫ موسيقى وغناء خلفي متكرر ♫" },
    { start: 168, end: 171, text: "يا أمي، ضربوني" },
    { start: 171, end: 176, text: "والضربة جاءت على صدري" },
    { start: 176, end: 181, text: "♫ موسيقى وغناء خلفي متكرر ♫" },
    { start: 181, end: 189, text: "يا أمي، يضربوني وأنا أصبر" },
    { start: 189, end: 204, text: "♫ موسيقى وغناء خلفي متكرر ♫" },
    { start: 204, end: 210, text: "يا رايا رايا، يا أمي، يا رايا رايا" },
    { start: 210, end: 215, text: "يا رايا رايا، ما جا حد نجدني" },
    { start: 215, end: 217, text: "ولا سألوني على رأيي" },
    { start: 217, end: 221, text: "يا أمي" },
    { start: 221, end: 229, text: "👏 تصفيق 👏" }
  ];

  // ==================== SOUS-TITRES THE TRANSLATOR ====================
  const translatorSubtitlesEn = [
    { start: 0, end: 1, text: "I want to present" },
    { start: 1, end: 5, text: "Something that Ridha El 9al3i (renowned violinist and composer) and Hedi Semlali (famous folk singer) used to do" },
    { start: 5, end: 6, text: "In the translation of texts" },
    { start: 6, end: 8, text: "As you know, Hedi Semlali" },
    { start: 8, end: 10, text: "Knows both languages: Arabic and French" },
    { start: 10, end: 13, text: "As you will see in his translation" },
    { start: 13, end: 17, text: "That is why, when I went to events" },
    { start: 17, end: 18, text: "I was eagerly waiting" },
    { start: 18, end: 21, text: "When Ridha El 9al3i and Hedi Semlali" },
    { start: 21, end: 29, text: "Performed this work" },
    { start: 29, end: 33, text: "And it was accompanied by Ridha El 9al3i's violin" },
    { start: 33, end: 37, text: "But for memories, I want to ask Hedi Semlali here present" },
    { start: 37, end: 43, text: "To present this work to us, and I don't think he will refuse to do this translation" },
    { start: 43, end: 47, text: "I can't say we will do the entire translation" },
    { start: 47, end: 51, text: "It is widely heard and people will almost learn it" },
    { start: 51, end: 60, text: "But here I will tell you that everyone knows I do this piece" },
    { start: 60, end: 66, text: "But there was also Ridha El 9al3i who accompanied me" },
    { start: 66, end: 86, text: "First, I like that he does the piece with me because he is a serious person who knows how to manage money" },
    { start: 86, end: 92, text: "So let's begin" },
    { start: 92, end: 108, text: "Go ahead gentlemen, now I will present to you the first translator who trained at the college of Bab Souika (a place in Tunis)" },
    { start: 108, end: 116, text: "You next to me would be my accompanist" },
    { start: 116, end: 120, text: "So tell me gentlemen, do we have something for today?" },
    { start: 120, end: 122, text: "Yes, we have an envelope" },
    { start: 122, end: 124, text: "Ahh we have an envelope, who brought it?" },
    { start: 124, end: 126, text: "A woman" },
    { start: 126, end: 129, text: "As usual" },
    { start: 129, end: 131, text: "And the money, where is it?" },
    { start: 131, end: 132, text: "Yes, in the cash box" },
    { start: 132, end: 135, text: "Hesitantly, 'cash box' means his pocket" },
    { start: 135, end: 138, text: "Ironically" },
    { start: 138, end: 141, text: "Ahh what shall I do, let's go gentlemen" },
    { start: 141, end: 144, text: "My grandfather Hassan" },
    { start: 144, end: 148, text: "Oh god, what does your grandfather have to do with this? Tell me what is written in the people's envelope" },
    { start: 148, end: 152, text: "Yes, it's the people's envelope" },
    { start: 152, end: 164, text: "My handsome grandfather (in French), yes continue" },
    { start: 164, end: 167, text: "Yesterday was the third of my uncle's son named Mouloud" },
    { start: 167, end: 172, text: "Ahhh (sighing), but what do I do with your uncle Mouloud's son?" },
    { start: 172, end: 175, text: "It's not my uncle's son, it's the envelope's uncle's son" },
    { start: 175, end: 178, text: "Yes, let's continue" },
    { start: 178, end: 184, text: "Yesterday was the third demon cousin (in French)" },
    { start: 184, end: 185, text: "What is his name?" },
    { start: 185, end: 195, text: "Mouloud" },
    { start: 195, end: 198, text: "Names are finished in this world, couldn't they find a name? (ironically)" },
    { start: 198, end: 208, text: "Mouloud Mouloud, newborn (in French)" },
    { start: 208, end: 214, text: "And on this occasion they made a 3awada (celebration with music)" },
    { start: 214, end: 217, text: "And on this occasion, they organized (in French)" },
    { start: 217, end: 220, text: "Where does the word 3awada come from? Ahh yes, a female recommencer (in French) ironically" },
    { start: 220, end: 233, text: "And this 3awada is composed of" },
    { start: 233, end: 235, text: "This recommencer is composed of (in French)" },
    { start: 235, end: 239, text: "A lute" },
    { start: 239, end: 240, text: "On your head" },
    { start: 240, end: 244, text: "We're at work, you know me" },
    { start: 244, end: 246, text: "The other lute of the 3awada, not the stick" },
    { start: 246, end: 247, text: "Ahhh (ironically)" },
    { start: 247, end: 250, text: "Is composed of a stick (in French)" },
    { start: 250, end: 252, text: "And a qanun (Arabic musical instrument)" },
    { start: 252, end: 256, text: "A regulation (in French)" },
    { start: 256, end: 258, text: "And a jrana (Tunisian name for violin)" },
    { start: 258, end: 264, text: "Jrana? A frog (in French) with irony and laughter" }
  ];

  const translatorSubtitlesAr = [
    { start: 0, end: 1, text: "أريد أن أقدم" },
    { start: 1, end: 5, text: "شيئاً كان يفعله رضا القلعي (عازف كمان وملحن معروف) والهادي السملالي (مطرب شعبي معروف)" },
    { start: 5, end: 6, text: "في ترجمة النصوص" },
    { start: 6, end: 8, text: "كما تعلمون، الهادي السملالي" },
    { start: 8, end: 10, text: "يعرف اللغتين: العربية والفرنسية" },
    { start: 10, end: 13, text: "كما سترون في ترجمته" },
    { start: 13, end: 17, text: "ولهذا، عندما كنت أذهب إلى المناسبات" },
    { start: 17, end: 18, text: "كنت أنتظر بفارغ الصبر" },
    { start: 18, end: 21, text: "عندما كان رضا القلعي والهادي السملالي" },
    { start: 21, end: 29, text: "يؤديان هذا العمل" },
    { start: 29, end: 33, text: "وكان مصحوباً بكمان رضا القلعي" },
    { start: 33, end: 37, text: "لكننا، للذكريات، أريد أن أطلب من الهادي السملالي الموجود هنا" },
    { start: 37, end: 43, text: "ليقدم لنا هذا العمل، ولا أعتقد أنه سيرفض أن يقدم لنا هذه الترجمة" },
    { start: 43, end: 47, text: "لا أستطيع أن أقول أننا سنقوم بكل الترجمة" },
    { start: 47, end: 51, text: "إنها مسموعة كثيراً وسيكاد الناس يتعلمونها" },
    { start: 51, end: 60, text: "لكن هنا سأقول لك أن الجميع يعلم أنني أقوم بهذه القطعة" },
    { start: 60, end: 66, text: "لكن كان هناك أيضاً رضا القلعي الذي يرافقني" },
    { start: 66, end: 86, text: "أولاً، أحب أن يؤدي معي القطعة لأنه شخص جاد ويعرف كيف يدير المال" },
    { start: 86, end: 92, text: "إذاً لنبدأ" },
    { start: 92, end: 108, text: "تفضلوا سادتي، الآن سأقدم لكم أول مترجم تخرج من كلية باب سويقة (مكان بتونس)" },
    { start: 108, end: 116, text: "أنتم بجانبي ستكونون مرافقيني" },
    { start: 116, end: 120, text: "قل لي سادتي، هل لدينا شيء لليوم؟" },
    { start: 120, end: 122, text: "نعم لدينا ظرف" },
    { start: 122, end: 124, text: "آه لدينا ظرف، من أحضره؟" },
    { start: 124, end: 126, text: "امرأة" },
    { start: 126, end: 129, text: "كالعادة" },
    { start: 129, end: 131, text: "والفلوس، أين هي؟" },
    { start: 131, end: 132, text: "نعم في الصندوق" },
    { start: 132, end: 135, text: "بتردد، الصندوق يعني جيبه" },
    { start: 135, end: 138, text: "بسخرية" },
    { start: 138, end: 141, text: "آه ماذا سأفعل، هيا بنا سادتي" },
    { start: 141, end: 144, text: "جدي حسن" },
    { start: 144, end: 148, text: "يا إلهي، ما علاقة جدك بهذا؟ قل لي ماذا مكتوب في ظرف الناس" },
    { start: 148, end: 152, text: "نعم إنه ظرف الناس" },
    { start: 152, end: 164, text: "جدي الجميل (بالفرنسية)، نعم تابع" },
    { start: 164, end: 167, text: "أمس كان الثالث لابن خالي المسمى مولود" },
    { start: 167, end: 172, text: "آه (بالتنهد)، لكن ماذا أفعل بابن خالك مولود؟" },
    { start: 172, end: 175, text: "إنه ليس ابن خالي، بل ابن خال الظرف" },
    { start: 175, end: 178, text: "نعم لنكمل" },
    { start: 178, end: 184, text: "أمس كان الثالث لابن العم الشيطان (بالفرنسية)" },
    { start: 184, end: 185, text: "ما اسمه؟" },
    { start: 185, end: 195, text: "مولود" },
    { start: 195, end: 198, text: "الأسماء خلصت في هذا العالم، ما لقوش اسم؟ (بسخرية)" },
    { start: 198, end: 208, text: "مولود مولود، مولود جديد (بالفرنسية)" },
    { start: 208, end: 214, text: "وبهذه المناسبة عملوا عودة (احتفال بالموسيقى)" },
    { start: 214, end: 217, text: "وبهذه المنظمة، نظموا (بالفرنسية)" },
    { start: 217, end: 220, text: "من أين جاءت كلمة عودة؟ آه نعم، معيدة (بالفرنسية) بسخرية" },
    { start: 220, end: 233, text: "وهذه العودة مكونة من" },
    { start: 233, end: 235, text: "هذه المعيدة مكونة من (بالفرنسية)" },
    { start: 235, end: 239, text: "عود" },
    { start: 239, end: 240, text: "على راسك" },
    { start: 240, end: 244, text: "نحن في العمل، أنت تعرفني" },
    { start: 244, end: 246, text: "العود الآخر للعودة، مش العصا" },
    { start: 246, end: 247, text: "آه (بسخرية)" },
    { start: 247, end: 250, text: "مكون من عصا (بالفرنسية)" },
    { start: 250, end: 252, text: "وقانون (آلة موسيقية عربية)" },
    { start: 252, end: 256, text: "ونظام (بالفرنسية)" },
    { start: 256, end: 258, text: "وجرنة (اسم تونسي للكمان)" },
    { start: 258, end: 264, text: "جرنة؟ ضفدعة (بالفرنسية) بسخرية وضحك" }
  ];

  // ✅ Fonction pour récupérer les sous-titres selon la vidéo ET la langue
  const getSubtitles = () => {
    if (video === "yaraya") {
      return lang === "ar" ? yarayaSubtitlesAr : yarayaSubtitlesEn;
    } else if (video === "translator") {
      return lang === "ar" ? translatorSubtitlesAr : translatorSubtitlesEn;
    }
    return [];
  };

  // 🔁 Texte alterné
  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) =>
        prev === "Click to explore" ? "اضغط للاستكشاف" : "Click to explore"
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const touchHandler = () => {
    lastInteraction.current = Date.now();
  };

  useEffect(() => {
    window.addEventListener("click", touchHandler);
    window.addEventListener("touchstart", touchHandler);
    return () => {
      window.removeEventListener("click", touchHandler);
      window.removeEventListener("touchstart", touchHandler);
    };
  }, []);

  // Charger YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Nettoyage du player
  const cleanupPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
      setPlayerReady(false);
      setIsStarted(false);
      setIsPaused(false);
      setIsVideoEnded(false);
      setActiveButton(null);
    }
  };

  // Initialiser le player YouTube
  useEffect(() => {
    if (screen === "video" && video) {
      cleanupPlayer();

      const interval = setInterval(() => {
        if (window.YT && !playerRef.current) {
          let videoId = "";
          if (video === "yaraya") videoId = "wB1kZxE_lic";
          else if (video === "translator") videoId = "MThinFHp0k8";

          playerRef.current = new window.YT.Player("yt-player", {
            height: "300",
            width: "525",
            videoId,
            playerVars: { 
              controls: 0,
              modestbranding: 1,
              disablekb: 1
            },
            events: {
              onReady: () => setPlayerReady(true),
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  setIsVideoEnded(true);
                  setIsPaused(true);
                }
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsVideoEnded(false);
                }
              }
            }
          });
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      cleanupPlayer();
    }
  }, [screen, video]);

  // Gestion des sous-titres
  useEffect(() => {
    let interval;
    if (playerReady && lang && video) {
      interval = setInterval(() => {
        if (isStarted && !isPaused && !isVideoEnded) {
          const currentTime = playerRef.current.getCurrentTime();
          const currentSubtitles = getSubtitles();
          const current = currentSubtitles.find(
            (s) => currentTime >= s.start && currentTime <= s.end
          );
          setSubtitle(current ? current.text : "");
        } else {
          setSubtitle("");
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStarted, isPaused, isVideoEnded, playerReady, lang, video]);

  // Timeout 10 secondes
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastInteraction.current) / 1000;
      
      if (screen === "video") {
        const shouldReturnToSplash = 
          (!isStarted && playerReady) || 
          (isPaused && isStarted) ||
          isVideoEnded;
        
        if (shouldReturnToSplash && elapsed >= 10) {
          setScreen("splash");
          setActiveButton(null);
          setIsStarted(false);
          setIsPaused(false);
          setIsVideoEnded(false);
          lastInteraction.current = Date.now();
        }
      } else if (screen !== "video" && elapsed >= 10) {
        setScreen("splash");
        setActiveButton(null);
      }
    }, 500);
    return () => clearInterval(checkInterval);
  }, [screen, isStarted, isPaused, isVideoEnded, playerReady]);

  const handleStart = () => {
    if (playerReady) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setIsStarted(true);
      setIsPaused(false);
      setIsVideoEnded(false);
      setActiveButton("start");
      lastInteraction.current = Date.now();
    }
  };
  
  const handlePause = () => {
    if (playerReady) {
      playerRef.current.pauseVideo();
      setIsPaused(true);
      setActiveButton("pause");
      lastInteraction.current = Date.now();
    }
  };
  
  const handleResume = () => {
    if (playerReady) {
      playerRef.current.playVideo();
      setIsPaused(false);
      setIsVideoEnded(false);
      setActiveButton("resume");
      lastInteraction.current = Date.now();
    }
  };

  const bgClass =
    "bg-gray-200 py-16 relative overflow-hidden min-h-screen flex items-center justify-center";

  const bgImage = (
    <div
      className="absolute inset-0 z-0 opacity-20"
      style={{
        backgroundImage:
          'url("https://image2url.com/r2/default/images/1768856222315-b45b8d94-030c-4207-8e70-8d3c0facde44.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    />
  );

  const buttonStyle =
    "px-10 py-4 rounded-xl text-white border-2 border-white/40 backdrop-blur-md transition-all font-semibold shadow-lg";
  const activeButtonStyle = "bg-white text-blue-600 scale-105";
  const hoverStyle = "hover:bg-white hover:text-blue-600 hover:scale-105";

  // Splash screen
  if (screen === "splash") {
    return (
      <div className={bgClass} onClick={() => setScreen("language")}>
        {bgImage}
        <style>{`
          @keyframes pulseHand {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes ripple {
            0% { transform: scale(0.5); opacity: 0.6; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <Hand
              size={64}
              strokeWidth={1.5}
              stroke="white"
              fill="none"
              style={{ animation: "pulseHand 1.5s ease-in-out infinite" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 border border-white rounded-full"
                style={{ animation: "ripple 1.5s infinite" }}
              ></div>
            </div>
          </div>
          <div className="text-white text-xl transition-opacity duration-500">
            {text}
          </div>
        </div>
      </div>
    );
  }

  // Language screen
  if (screen === "language") {
    return (
      <div className={bgClass}>
        {bgImage}
        <div className="z-10 flex gap-6">
          <button
            className={`${buttonStyle} ${hoverStyle}`}
            onClick={() => {
              setLang("en");
              setScreen("works");
            }}
          >
            English
          </button>
          <button
            className={`${buttonStyle} ${hoverStyle}`}
            onClick={() => {
              setLang("ar");
              setScreen("works");
            }}
          >
            العربية
          </button>
        </div>
      </div>
    );
  }

  // Works screen
  if (screen === "works") {
    const backButtonStyle =
      "absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all";

    const t = {
      back: lang === "ar" ? "رجوع" : "Back",
    };

    return (
      <div className={bgClass}>
        {bgImage}
        <button className={backButtonStyle} onClick={() => setScreen("language")}>
          ← {t.back}
        </button>
        <div className="z-10 flex flex-col gap-6 items-center">
          <h1 className="text-white text-3xl drop-shadow-lg">
            {lang === "en"
              ? "Which work would you like to explore?"
              : "أي عمل تريد استكشافه؟"}
          </h1>

          <button
            className={`${buttonStyle} ${hoverStyle}`}
            onClick={() => {
              setVideo("yaraya");
              setScreen("video");
            }}
          >
            {lang === "en" ? "Ya Raya Raya" : "يا رايا رايا"}
          </button>

          <button
            className={`${buttonStyle} ${hoverStyle}`}
            onClick={() => {
              setVideo("translator");
              setScreen("video");
            }}
          >
            {lang === "en" ? "The Translator" : "المترجم"}
          </button>
        </div>
      </div>
    );
  }

  // Video screen
  if (screen === "video") {
    const t = {
      start: lang === "ar" ? "ابدأ" : "Start",
      pause: lang === "ar" ? "إيقاف" : "Pause",
      resume: lang === "ar" ? "استئناف" : "Resume",
      back: lang === "ar" ? "رجوع" : "Back",
    };

    return (
      <div className={bgClass}>
        {bgImage}
        <div className="z-10 flex flex-col items-center gap-6 relative">
          <div className="relative" style={{ width: "525px", height: "300px" }}>
            <div 
              id="yt-player" 
              className="shadow-2xl absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: "none" }}
            ></div>
            <div 
              className="absolute top-0 left-0 w-full h-full z-10"
              style={{ cursor: "default" }}
              onClick={(e) => e.stopPropagation()}
            ></div>
          </div>

          <div className="text-white bg-black/50 px-4 py-2 rounded z-20 backdrop-blur-sm text-center max-w-2xl">
            {subtitle}
          </div>

          <div className="flex gap-4 z-20 flex-wrap justify-center">
            <button
              className={`${buttonStyle} ${hoverStyle} ${
                activeButton === "start" ? activeButtonStyle : ""
              }`}
              onClick={handleStart}
            >
              {t.start}
            </button>
            <button
              className={`${buttonStyle} ${hoverStyle} ${
                activeButton === "pause" ? activeButtonStyle : ""
              }`}
              onClick={handlePause}
            >
              {t.pause}
            </button>
            <button
              className={`${buttonStyle} ${hoverStyle} ${
                activeButton === "resume" ? activeButtonStyle : ""
              }`}
              onClick={handleResume}
            >
              {t.resume}
            </button>
            <button
              className={`${buttonStyle} ${hoverStyle}`}
              onClick={() => {
                setScreen("works");
                setActiveButton(null);
                setIsStarted(false);
                setIsPaused(false);
                setIsVideoEnded(false);
              }}
            >
              {t.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
