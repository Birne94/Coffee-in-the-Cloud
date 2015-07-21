import re

filename = "coffee-in-the-cloud.tex"

with file(filename, "r") as fs:
    data = fs.read()


data = data.replace("\\tightlist\n", "")
data = data.replace(r"\begin{Shaded}\n\begin{Highlighting}[]\n\NormalTok{COFFEE_PRICE }\OperatorTok{=} \FloatTok{0.25}\n\end{Highlighting}\n\end{Shaded}".replace("\\n", "\n"),
                    r"""\begin{lstlisting}[language=python]
COFFEE_PRICE = 0.25
\end{lstlisting}""")
data = data.replace(r"\section", r"""\newpage
\section""")

images = re.findall("(\\includegraphics\\{(.*?)\\})", data)

for i in images:
    data = data.replace(i[0], "makebox[\\textwidth]{\\includegraphics[width=\\textwidth]{%s}}" % i[1])


weird_headings = re.findall("(\n\n.textbf\{(.*?)\}\n\n)", data)

for h in weird_headings:
    data = data.replace(h[0], "\n\n\\subsubsection*{%s}\n\n" % h[1])


with file(filename, "w") as fs:
    fs.write(data)
