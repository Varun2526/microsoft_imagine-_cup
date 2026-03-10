find src -name "*.ts" -o -name "*.tsx" | while read -r file; do
    # Skip .d.ts files
    if [[ "$file" == *.d.ts ]]; then
        rm "$file"
        continue
    fi
    
    if [[ "$file" == *.tsx ]]; then
        outfile="${file%.tsx}.jsx"
    else
        outfile="${file%.ts}.js"
    fi
    echo "Converting $file to $outfile"
    npx -y detype@2.0.4 "$file" "$outfile"
    rm "$file"
done
