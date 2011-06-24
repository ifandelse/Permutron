@echo off 
set OutDebugFile=output\Permutron.debug.js
set OutMinFile=output\Permutron.js
set AllFiles=
for /f "eol=] delims=' " %%i in (source-references.js) do set Filename=%%i& call :Concatenate

goto :Combine
:Concatenate 
    if /i "%AllFiles%"=="" ( 
        set AllFiles=..\%Filename:/=\%
    ) else ( 
        set AllFiles=%AllFiles% ..\%Filename:/=\%
    ) 
goto :EOF 

:Combine
type %AllFiles%                   > %OutDebugFile%.temp

@rem Now call Uglifyjs to produce a minified version
copy /y version-header.js %OutMinFile%
tools\curl -d output_info=compiled_code -d output_format=text -d compilation_level=ADVANCED_OPTIMIZATIONS --data-urlencode js_code@%OutDebugFile%.temp "http://marijnhaverbeke.nl/uglifyjs" > %OutMinFile%.temp

@rem Finalise each file by prefixing with version header and surrounding in function closure
copy /y version-header.js %OutDebugFile%
echo (function(window,undefined){  >> %OutDebugFile%
type %OutDebugFile%.temp		   >> %OutDebugFile%
echo ;                             >> %OutDebugFile%
echo window.Permutron = Permutron; >> %OutDebugFile%
echo })(window);                   >> %OutDebugFile%
del %OutDebugFile%.temp

copy /y version-header.js %OutMinFile%
echo (function(window,undefined){  >> %OutMinFile%
type %OutMinFile%.temp		  	   >> %OutMinFile%
echo ;                             >> %OutMinFile%
echo window.Permutron = Permutron; >> %OutMinFile%
echo })(window);                   >> %OutMinFile%
del %OutMinFile%.temp

xcopy %OutDebugFile% "..\example\Permutron.debug.js" /Y
xcopy %OutMinFile% "..\example\Permutron.js" /Y